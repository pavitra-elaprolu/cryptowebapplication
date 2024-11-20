

const options = {
  headers: {
      'x-access-token': 'coinranking98909fb79fe3692269676973a6c34248bace8a842651a53c',
  },
};

// Fetching data from CoinRankApi
async function coinFetch() {
  const response = await fetch('https://api.coinranking.com/v2/coins', options);
  const data = await response.json();
  return data;
}

let coinsContainer = document.getElementById('coins-container'); // Getting coinsContainer
let currentPage = 1;
const coinsPerPage = 10;
let allCoins = [];

async function coinData(page = 1) {
  const response = await coinFetch();
  allCoins = response.data.coins;
  
  displayCoins(allCoins, page);
  setupPagination(allCoins);
}

function displayCoins(coins, page) {
  coinsContainer.innerHTML = '';
  const start = (page - 1) * coinsPerPage;
  const end = start + coinsPerPage;
  const paginatedCoins = coins.slice(start, end);

  paginatedCoins.forEach((coin) => {
      let coins_div = document.createElement('div');
      coins_div.setAttribute("class", "coinsDiv");

      // Displaying data
      let coinName = document.createElement("h2");
      coinName.setAttribute("class", "coinName");
      coinName.textContent = coin.name;

      let coinIcon = document.createElement("img");
      coinIcon.src = coin.iconUrl;
      coinIcon.setAttribute("class", "coinIcon");

      let price = document.createElement('h3');
      price.setAttribute("class", "price");
      let priceRupee = (coin.price) * 83.43;
      let roundPrice = priceRupee.toFixed(4);
      price.innerHTML = `Price: <i class="fa fa-rupee" style="font-size:24px;color:red"></i> ${roundPrice}`;

      let symbol = document.createElement("h3");
      symbol.setAttribute("class", "symbol");
      symbol.textContent = `Symbol: ${coin.symbol}`;

      coins_div.appendChild(coinName);
      coins_div.appendChild(coinIcon);
      coins_div.appendChild(price);
      coins_div.appendChild(symbol);

      coinsContainer.appendChild(coins_div);
  });
}

function setupPagination(coins) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(coins.length / coinsPerPage);

  for (let i = 1; i <= pageCount; i++) {
      let button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-button');
      button.addEventListener('click', () => {
          displayCoins(coins, i);
          currentPage = i;
      });
      paginationContainer.appendChild(button);
  }
}

function searchCoins() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
  const filteredCoins = allCoins.filter(coin => coin.name.toLowerCase().includes(searchInput));
  
  displayCoins(filteredCoins, 1);
  setupPagination(filteredCoins);
}

coinData();





