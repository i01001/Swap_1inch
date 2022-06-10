const Web3 = require("web3");
const axios = require("axios");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const web3 = new Web3(RPC_URL);
// const wallet = new web3.eth.accounts.wallet.add(PRIVATE_KEY);

async function quotes() {
  try {
      const quote = await axios.get('https://api.1inch.io/v4.0/250/quote?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E&amount=100000000000000000');
      console.log(quote);
    } catch (error) {
    console.log("Quote execution error", error);
  }
}




async function main() {
    await quotes();
}

main();