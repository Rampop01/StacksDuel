# StacksDuel SDK ⚔️

The official zero-dependency JavaScript SDK for reading from and interacting with **StacksDuel** on the Stacks blockchain.

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

## Hackathon Impact
Built as advanced tooling infrastructure for the **Talent Protocol Stacks Builder Rewards** initiative.
