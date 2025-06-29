
let tronWeb;

async function connectWallet() {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    tronWeb = window.tronWeb;
    const address = tronWeb.defaultAddress.base58;
    document.getElementById("wallet-address").innerText = address;

    // Get TRX balance
    const balanceSun = await tronWeb.trx.getBalance(address);
    document.getElementById("wallet-balance").innerText = balanceSun / 1e6;

    document.getElementById("wallet-info").style.display = "block";
  } else {
    alert("Please open this page in Trust Wallet's DApp browser with Tron network.");
  }
}

async function sendUSDT() {
  const toAddress = "TXQK2rTTD9y1JACz27T6MD6jRziZAmE4Tb"; // Replace with your TRON address
  const tokenAddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"; // USDT-TRON contract

  const amount = 1 * 1e6; // 1 USDT (in SUN)

  const contract = await tronWeb.contract().at(tokenAddress);

  try {
    const result = await contract.transfer(toAddress, amount).send();
    alert("Transaction sent: " + result);
  } catch (error) {
    console.error(error);
    alert("Transaction failed.");
  }
}
