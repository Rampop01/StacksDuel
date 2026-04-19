// StacksDuel PRO Dashboard Logic
const connectBtn = document.getElementById('connect-btn');
const activityFeed = document.getElementById('activity-feed');

const userSession = new window.stacksConnect.UserSession();

// Mock Activity for the UI Visualization
const botNames = ['SP3Z...XYZ', 'SP1M...44A', 'SP2W...99B', 'SP9Q...11C'];
const actions = ['Created Duel', 'Voted Option A', 'Voted Option B', 'Minted Champion NFT'];

function addActivity() {
    const item = document.createElement('div');
    item.className = 'text-sm border-b border-slate-800 pb-2 animate-pulse';
    const bot = botNames[Math.floor(Math.random() * botNames.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    item.innerHTML = `<span class="text-violet-400">${bot}</span> <span class="text-slate-500 uppercase text-[10px]">${action.split(' ')[0]}</span> <span class="text-white">${action.split(' ').slice(1).join(' ')}</span>`;
    
    activityFeed.prepend(item);
    if (activityFeed.children.length > 15) activityFeed.lastElementChild.remove();
}

setInterval(addActivity, 3000);

// Wallet Connection
connectBtn.addEventListener('click', () => {
    if (userSession.isUserSignedIn()) {
        userSession.signUserOut();
        connectBtn.innerText = 'Connect Wallet';
    } else {
        window.stacksConnect.showConnect({
            userSession,
            appDetails: { name: 'StacksDuel PRO', icon: '' },
            onFinish: () => {
                const addr = userSession.loadUserData().profile.stxAddress.mainnet;
                connectBtn.innerText = addr.slice(0, 5) + '...' + addr.slice(-5);
            }
        });
    }
});
