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
