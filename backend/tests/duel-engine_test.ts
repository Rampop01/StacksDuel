import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
} from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: 'Ensure that a user can create a new duel',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;

    let block = chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'create-duel',
        [
          types.ascii('Bitcoin vs Ethereum: Who wins 2026?'),
          types.list([types.ascii('Bitcoin'), types.ascii('Ethereum')]),
          types.uint(0),
        ],
        wallet_1.address,
      ),
    ]);

    // Check transaction success
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    
    // Verify the return value is (ok u1)
    block.receipts[0].result.expectOk().expectUint(1);
    
    // Verify on-chain state via read-only call
    let duelDetails = chain.callReadOnlyFn(
        'duel-engine',
        'get-duel-details',
        [types.uint(1)],
        deployer.address
    );
    
    const duel = duelDetails.result.expectSome().expectTuple();
    assertEquals(duel['title'], types.ascii('Bitcoin vs Ethereum: Who wins 2026?'));
    assertEquals(duel['active'], types.bool(true));
  },
});

Clarinet.test({
  name: 'Ensure that a user can vote on an active duel',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;

    // 1. Create a duel
    let block = chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'create-duel',
        [
          types.ascii('iOS vs Android: Superior mobile OS?'),
          types.list([types.ascii('iOS'), types.ascii('Android')]),
          types.uint(0),
        ],
        wallet_1.address,
      ),
    ]);

    // 2. Vote from another wallet
    let voteBlock = chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'vote',
        [types.uint(1), types.uint(1)], // Vote for Android (index 1)
        wallet_2.address,
      ),
    ]);

    // Check success
    voteBlock.receipts[0].result.expectOk().expectBool(true);
    
    // Verify already voted error
    let doubleVoteBlock = chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'vote',
        [types.uint(1), types.uint(1)],
        wallet_2.address,
      ),
    ]);
    
    // ERR-ALREADY-VOTED is u102
    doubleVoteBlock.receipts[0].result.expectErr().expectUint(102);
  },
});

Clarinet.test({
  name: 'Ensure that only the creator can resolve a duel',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;

    // 1. Create a duel from wallet_1
    chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'create-duel',
        [
          types.ascii('BTC hits 200k this year?'),
          types.list([types.ascii('YES'), types.ascii('NO')]),
          types.uint(0),
        ],
        wallet_1.address,
      ),
    ]);

    // 2. Try to resolve from wallet_2 (unauthorized)
    let failBlock = chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'resolve-duel',
        [types.uint(1), types.uint(0)],
        wallet_2.address,
      ),
    ]);
    
    // ERR-NOT-AUTHORIZED is u104
    failBlock.receipts[0].result.expectErr().expectUint(104);

    // 3. Resolve from wallet_1 (success)
    let successBlock = chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'resolve-duel',
        [types.uint(1), types.uint(0)],
        wallet_1.address,
      ),
    ]);
    
    successBlock.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Ensure that voting is blocked on closed duels',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;

    // 1. Create and resolve a duel
    chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'create-duel',
        [
          types.ascii('Next.js vs Remix?'),
          types.list([types.ascii('Next.js'), types.ascii('Remix')]),
          types.uint(0),
        ],
        wallet_1.address,
      ),
      Tx.contractCall(
        'duel-engine',
        'resolve-duel',
        [types.uint(1), types.uint(0)],
        wallet_1.address,
      ),
    ]);

    // 2. Try to vote on the closed duel
    let voteBlock = chain.mineBlock([
      Tx.contractCall(
        'duel-engine',
        'vote',
        [types.uint(1), types.uint(1)],
        wallet_2.address,
      ),
    ]);
    
    // ERR-DUEL-CLOSED is u103
    voteBlock.receipts[0].result.expectErr().expectUint(103);
  },
});
