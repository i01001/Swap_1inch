const Web3 = require("web3");
const axios = require("axios");
require("dotenv").config();
const BigNumber = require("bignumber.js");
// var Contract = require('web3-eth-contract');


const RPC_URL_FANTOM_MAINNET = process.env.RPC_URL_FANTOM_MAINNET;
const PRIVATE_KEY_FTM = process.env.PRIVATE_KEY_FTM;

// Contract.setProvider(RPC_URL_FANTOM_MAINNET);

const web3 = new Web3(RPC_URL_FANTOM_MAINNET);
const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY_FTM);

let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];


async function quotes() {
  try {
    const quote = await axios.get(
      "https://api.1inch.io/v4.0/250/quote?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E&amount=100000000000000000"
    );
    console.log(quote);
    if (quote) {
      name1 = await quote.data.toTokenAmount;
      console.log(await name1);
    }
  } catch (error) { 
    console.log("Quote execution error", error);
  }
}

async function approval(_tokenAddress, _tokenAmount) {
  try {
    const approve = await axios.get(
      "https://api.1inch.io/v4.0/250/approve/transaction?tokenAddress=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E&amount=100000000000000000"
    );
    // console.log(approve);
    if (approve.data) {
      approve_data = approve.data;
      console.log(await approve_data.gasPrice);
      approve_data.gas = 1000000;
      approve_data.from = wallet.address;
      transaction = await web3.eth.sendTransaction(approve_data);
  
      if (transaction.status) {
        console.log("approval for DAI successful", _tokenAmount);
      } else {
        console.log("Approval Transaction unsuccessful", _tokenAmount);
      }
    }
  } catch (error_approval) {
    console.log("Error approval", _tokenAmount);
  }
}

async function swappingFTMtoDAI(
  _fromTokenAddress,
  _toTokenAddress,
  _tokenAmount
) {
  if (_fromTokenAddress != "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
    await approval(_toTokenAddress, _tokenAmount);
  }
  try {
    const swap_FTMtoDAI = await axios.get(
      `https://api.1inch.io/v4.0/250/swap?fromTokenAddress=${_fromTokenAddress}&toTokenAddress=${_toTokenAddress}&amount=${_tokenAmount}&fromAddress=${wallet.address}&slippage=0.1&disableEstimate=true`
    );
    console.log(swap_FTMtoDAI);
    if (swap_FTMtoDAI.data) {
      swap_data = swap_FTMtoDAI.data;
      swap_data.tx.gas = 1000000;
      // console.log("1", swap_data.tx);
      // transaction = await web3.eth.sendTransaction(swap_data.tx);
      // if (transaction.status) {
      //   console.log("Swap FTM to DAI successful");
      // }
    }
  } catch (swapFTMtoDAIerror) {
    console.log("Error swapping FTM to DAI", swapFTMtoDAIerror);
  }
}

async function main() {
  // await quotes();
    // await approval(0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E, 100000000000000000)
    await swappingFTMtoDAI("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E", 100000000000000000)
  // fromTokenAddress = "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E";
  // toAddressAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  // tokenAmount = 100000000000000000;

  // if (fromTokenAddress != "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
  //   var contract = new web3.eth.Contract(minABI, fromTokenAddress);
  //   let balance = await contract.methods.balanceOf(wallet.address).call();
  //   console.log(balance);
  //   swappingFTMtoDAI(fromTokenAddress, toAddressAddress, balance);

  // }
  // else{
  
  // ftm_balance = await web3.eth.getBalance(wallet.address);

  //   ftm_trade1 = new web3.utils.BN(ftm_balance);
  //   ftm_trade2 = new web3.utils.BN(web3.utils.toWei('4.8'));
  //   ftm_trade = ftm_trade1.sub(ftm_trade2);

  // console.log("FTM Total Balance", web3.utils.fromWei(ftm_balance, "ether") + " FTM");
  // console.log("FTM Trade Amount", web3.utils.fromWei(ftm_trade, "ether") + " FTM");
  // await swappingFTMtoDAI(fromTokenAddress, toAddressAddress, ftm_trade);

  // }
  
  //client


}

main();
