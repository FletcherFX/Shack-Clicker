let coins = 0.00;
let gems = 0;
let clickPower = 0.01;

const exchangeRate = 50.00;

const items = [
    {
        id: 'leather_glove',
        name: 'Кожаная перчатка',
        costCoins: 2.50,
        costGems: 0,
        powerBoost: 0.02,
        img: 'leather_glove.webp'
    },
    {
        id: 'reinforced_leather_glove',
        name: 'Укреп. перчатка',
        costCoins: 15.00,
        costGems: 0,
        powerBoost: 0.05,
        img: 'reinforced_leather_glove.webp'
    },
    {
        id: 'frost_shard',
        name: 'Осколок льда',
        costCoins: 0,
        costGems: 1,
        powerBoost: 0.20,
        img: 'frost_shard.webp'
    },
    {
        id: 'magma_heart',
        name: 'Сердце магмы',
        costCoins: 0,
        costGems: 5,
        powerBoost: 1.50,
        img: 'magma_heart.webp'
    }
];

const inventory = [];

const coinDisplay = document.getElementById('coin-balance');
const gemDisplay = document.getElementById('gem-balance');
const clickPowerDisplay = document.getElementById('click-power');
const farmBtn = document.getElementById('farm-btn');
const exchangeBtn = document.getElementById('exchange-btn');
const shopGrid = document.getElementById('shop-grid');
const inventoryGrid = document.getElementById('inventory-grid');

function updateUI() {
    coinDisplay.textContent = coins.toFixed(2);
    gemDisplay.textContent = gems;
    clickPowerDisplay.textContent = clickPower.toFixed(2);
}

function renderShop() {
    shopGrid.innerHTML = '';
    items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item';
        
        let costHTML = '';
        if (item.costCoins > 0) {
            costHTML += `<img src="assets/coin.webp"> ${item.costCoins.toFixed(2)}`;
        }
        if (item.costGems > 0) {
            costHTML += `<img src="assets/diamond.webp"> ${item.costGems}`;
        }

        itemEl.innerHTML = `
            <img src="assets/${item.img}" alt="${item.name}">
            <div class="shop-tooltip">
                <div class="tooltip-name">${item.name}</div>
                <div class="tooltip-stat">+${item.powerBoost.toFixed(2)} за клик</div>
                <div class="tooltip-cost">${costHTML}</div>
            </div>
        `;

        itemEl.addEventListener('click', () => buyItem(index));
        shopGrid.appendChild(itemEl);
    });
}

function renderInventory() {
    inventoryGrid.innerHTML = '';
    inventory.forEach(item => {
        const invEl = document.createElement('div');
        invEl.className = 'inventory-item';
        invEl.innerHTML = `<img src="assets/${item.img}" alt="${item.name}">`;
        inventoryGrid.appendChild(invEl);
    });
}

function buyItem(index) {
    const item = items[index];
    
    if (coins >= item.costCoins && gems >= item.costGems) {
        coins -= item.costCoins;
        gems -= item.costGems;
        clickPower += item.powerBoost;
        
        inventory.push(item);
        
        updateUI();
        renderInventory();
    }
}

farmBtn.addEventListener('click', () => {
    coins += clickPower;
    updateUI();
});

exchangeBtn.addEventListener('click', () => {
    if (coins >= exchangeRate) {
        coins -= exchangeRate;
        gems += 1;
        updateUI();
    }
});

updateUI();
renderShop();
