const STACKS_API = 'https://api.mainnet.hiro.so/v2';
const CONTRACT_ADDRESS = 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M';
const CONTRACT_NAME = 'duel-engine';

/**
 * Fetches the most recent Duel ID from the StacksDuel contract.
 * @returns {Promise<number>} The ID of the latest confirmed duel.
 */
async function getLatestDuelId() {
    try {
        const api = "https://api.mainnet.hiro.so";
        const url = `${api}/v2/data_var/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/last-duel-id?proof=0`;
        const response = await fetch(url).catch(e => {
            console.error("SDK: Network failure on fetch:", e.message);
            throw e;
        });
        
        if (!response.ok) {
           throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (data && data.data) {
            const hex = data.data.slice(2);
            return parseInt(hex.slice(-8), 16);
        }
        return 0;
    } catch (error) {
        console.error("StacksDuel SDK Error fetching live ID:", error.message);
        return 0;
    }
}

/**
 * Generates the raw CV payload to cast a vote.
 * @param {number} duelId - The ID of the duel to vote on.
 * @param {number} optionIndex - The index of the prediction (e.g. 0 or 1).
 * @returns {Object} A formatted payload ready for @stacks/connect.
 */
function buildVotePayload(duelId, optionIndex) {
    return {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'vote',
        functionArgs: [
            '0x01' + parseInt(duelId).toString(16).padStart(32, '0'),
            '0x01' + parseInt(optionIndex).toString(16).padStart(32, '0'),
        ]
    };
}

module.exports = {
    getLatestDuelId,
    buildVotePayload,
    CONTRACT_ADDRESS,
    CONTRACT_NAME
};
