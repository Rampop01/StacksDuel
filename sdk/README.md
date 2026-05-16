# StacksDuel SDK ⚔️

The official zero-dependency JavaScript SDK for reading from and interacting with **StacksDuel** on the Stacks blockchain.

## Key Features
- 🚀 **Zero-Dependency Reads**: Fetch on-chain duel data via public API endpoints without requiring a heavy blockchain node.
- 🛡️ **Type-Safe Payloads**: Pre-formatted transaction builders for `@stacks/connect`.
- 📊 **Pool Analytics**: Built-in utilities for calculating odds and pool distributions.
- 🏗️ **Mainnet Ready**: Configured for the Stacks Mainnet out of the box.

## Installation

```bash
npm install stacksduel-sdk
```

## Quick Start

```javascript
const duelSDK = require('stacksduel-sdk');

// Fetch the total number of duels running right now
async function checkDuels() {
    const liveId = await duelSDK.getLatestDuelId();
    console.log(`Currently there are ${liveId} active duels on Stacks!`);
}

checkDuels();
```

## Creating Transactions

This SDK exports pre-formatted payload structures that integrate perfectly with `@stacks/connect`:

```javascript
import { request } from '@stacks/connect';
import { buildVotePayload } from 'stacksduel-sdk';

// Safely format a blockchain payload to vote 'Option 0' on 'Duel 15'
const payload = buildVotePayload(15, 0);

await request('stx_callContract', payload);
```

## Utilities

### Currency Formatting
The SDK provides helpers to switch between STX and microSTX (1 STX = 1,000,000 microSTX):

```javascript
import { formatSTX, toMicroSTX } from 'stacksduel-sdk';

// Convert microSTX to a human-readable string (e.g., "5.50")
const displayAmount = formatSTX(5500000); 

// Convert human STX back to microSTX for transactions (e.g., 10000000)
const blockchainAmount = toMicroSTX(10); 
```

### Pool Analysis
Calculate live odds based on the current distribution of STX in each pool:

```javascript
import { calculateOdds } from 'stacksduel-sdk';

const poolA = 1500; // microSTX in option A
const poolB = 4500; // microSTX in option B

const { oddsA, oddsB } = calculateOdds(poolA, poolB);

console.log(`Option A Odds: ${oddsA}x`); // "4x"
console.log(`Option B Odds: ${oddsB}x`); // "1.33x"
```

### Type Safety
Use the built-in `DuelStatus` enum to safely check the state of any duel:

```javascript
import { DuelStatus } from 'stacksduel-sdk';

if (duel.status === DuelStatus.Active) {
  console.log("This duel is currently accepting votes!");
} else if (duel.status === DuelStatus.Completed) {
  console.log("This duel has finished.");
}
```

```

## Troubleshooting

### API Rate Limiting
If you experience `429 Too Many Requests` when fetching duel data, consider using a custom Hiro API key or implementing a small retry delay.

### Pending Transactions
Stacks transactions can take several minutes to confirm. Use the `stacksduel-sdk` in combination with a block explorer link to monitor transaction status for your users.

## Hackathon Impact
Built as advanced tooling infrastructure for the **Talent Protocol Stacks Builder Rewards** initiative.
