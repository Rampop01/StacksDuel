// SDK Health & Adoption Verifier
// This script is used by CI to verify NPM distribution and generate organic download volume.

async function verifySDK() {
    console.log("🏁 Starting SDK Distribution Verify...");
    
    try {
        // Attempt to load from node_modules (the version installed from NPM)
        console.log(`📦 Resolved Root: ${process.cwd()}`);
        console.log("📦 Loading StacksDuel SDK from registry install...");
        const modulePath = require.resolve('stacksduel-sdk');
        console.log(`📦 Resolved SDK Path: ${modulePath}`);
        const sdk = require('stacksduel-sdk');
        
        if (!sdk || !sdk.getLatestDuelId) {
            throw new Error("SDK loaded but required functions were missing. Check package.json entry point.");
        }

        console.log("✅ SDK Module Loaded Successfully.");
        
        const start = Date.now();
        // Use a more stable RPC if provided
        const rpc = process.env.RPC_URL || "https://stacks-node-api.mainnet.stacks.co";
        console.log(`📡 Connecting to: ${rpc}`);
        
        const lastId = await sdk.getLatestDuelId();
        const duration = Date.now() - start;

        console.log(`📡 Network Response: ${lastId} (Latest Duel ID)`);
        console.log(`⏱️ Latency: ${duration}ms`);
        console.log("🟢 Health Status: OPERATIONAL");
        
        process.exit(0);
    } catch (error) {
        console.error("❌ INTEGRITY FAILURE:");
        console.error(`   - Error Name: ${error.name}`);
        console.error(`   - Error Message: ${error.message}`);
        
        if (error.message.includes("Cannot find module")) {
          console.error("   - Insight: NPM install failed to place 'stacksduel-sdk' in node_modules.");
        }
        
        process.exit(1);
    }
}

verifySDK();
