const connectButton = document.getElementById("connectButton");
const accountText = document.getElementById("account");
const balanceText = document.getElementById("balance");

let provider;
let signer;

connectButton.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await ethereum.request({ method: "eth_requestAccounts" });

      // Connect ethers provider
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      const address = await signer.getAddress();
      accountText.innerText = `Account: ${address}`;

      // Get balance
      const balance = await provider.getBalance(address);
      const balanceInEth = ethers.utils.formatEther(balance);
      balanceText.innerText = `Balance: ${balanceInEth} ETH`;
    } catch (err) {
      console.error(err);
      accountText.innerText = "Error connecting to wallet!";
    }
  } else {
    alert("MetaMask not found! Please install it.");
  }
});