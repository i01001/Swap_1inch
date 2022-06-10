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
      console.log("before");
      if (quote){
        name1 = await quote.data.estimatedGas;
        console.log("1", await name1);
      }
    } catch (error) {
    console.log("Quote execution error", error);
  }
}


async function swappingFTMtoDAI(){
  try {
    const swap_FTMtoDAI = await axios.get('https://api.1inch.io/v4.0/250/swap?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E&amount=100000000000000000&fromAddress=0xaF87B6479f9CA8D3BAE56deAd220bcE44a709549&slippage=0.1&disableEstimate=true');
    console.log(swap_FTMtoDAI);
  }catch (swapFTMtoDAIerror){
    console.log("Error swapping FTM to DAI", swapFTMtoDAIerror);
  }
}


async function main() {
    await quotes();
    // await swappingFTMtoDAI;
}

main();