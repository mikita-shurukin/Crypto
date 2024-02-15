
document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
  const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c2fe9dcdf4mshfc2385ecc2a3632p172487jsnde6bd498c0ac',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayData(result.data.coins);
  } catch (error) {
    console.error(error);
  }
}

function displayData(coins) {
  const coinsDataElement = document.getElementById("coinsData");
  coinsDataElement.innerHTML = ""; // Clear previous data

  coins.forEach(coin => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${coin.rank}</td>
      <td>
        <img src="${coin.iconUrl}" width="32" height="32" alt="icon ${coin.symbol}">
        ${coin.name} ${coin.symbol}
      </td>
      <td class="${setColor(coin.change)}">${coin.price}</td>
      <td class="${setColor(coin.change)}">${coin.change}</td>
    `;
    coinsDataElement.appendChild(row);
  });
}

function setColor(change) {
  change = parseFloat(change);
  return change > 0 ? "textGreen" : change < 0 ? "textRed" : "";
}
