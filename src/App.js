
import React, { useState, useEffect, createContext } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";
import { ethers } from 'ethers';
import contract from './paypal/paypal.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AppState = createContext();
function App() {


  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState('');
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');
  const [chain, setChain] = useState('');
  const [currency, setCurrency] = useState('');
  const [error, setError] = useState('');
  const [ercTokenAddress, setErcTokenAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokenChanged, setTokenChanged] = useState(false);
  const [amount, setAmount] = useState('');
  const [paypalContractAddress, setpaypalContractAddress] = useState('');
  const [Explorer, setExplorer] = useState('');
  const [showErc, setShowErc] = useState(false);
  const [ercLoading, setErcLodaing] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [saveTxLoad, setSaveTxLoad] = useState(false);
  const [showRecentTx, setShowRecentTx] = useState(false);
  const [img,setImg]=useState("");
  const [data,setData]=useState("");
  const [recentTx, setRecentTx] = useState({
    txhash: '',
    from: '',
    to: '',
    amount: '',
    symbol: ''
  })



  async function getBalance() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      const signer = provider.getSigner();
      const bal = ethers.utils.formatEther(await signer.getBalance());
      setBalance(bal?.slice(0, 5));

    } catch (err) {
      console.log(err);
    }
  }

  async function getAccount() {
    try {
     
        const accounts = await window.ethereum?.request({ method: 'eth_accounts' });
        const chainId = await window.ethereum?.request({ method: "eth_chainId" });
        if (chainId == "0x5") {
          setChain("Goerli")
          setCurrency("GoerliETH")
          setSymbol("Eth")
          setLogin(true);
          setpaypalContractAddress(process.env.REACT_APP_Goerli);
          setExplorer("https://goerli.etherscan.io")
        } else {
          setError("Can only access with Goerli")
          setLogin(false);
        }

        if (accounts[0]) {
          setAccount(accounts[0]);
          setLogin(true);
          getBalance();
          setTokenChanged(false);
          setErcTokenAddress('');

        }

        else {
          setLogin(false);
        }
      
      
    } catch (err) {
      toast.error(err.message);
    }


  }

  async function checkAccount() {
    try {
      await window.ethereum.on('accountsChanged', getAccount);
    } catch (err) {
      toast.error(err.message);
    }

  }


  const ERCABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)"
  ]

  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  const signer = provider.getSigner();
  const ERCContract = new ethers.Contract(ercTokenAddress, ERCABI, signer);
  const PaypalContract = new ethers.Contract(paypalContractAddress, contract.output.abi, signer);

  async function selectToken() {
    try {

      if(ercTokenAddress){
      setErcLodaing(true);
      const name = await ERCContract.name();
      const balance = await ERCContract.balanceOf(account);
      const symbol = await ERCContract.symbol();
      setBalance(ethers.utils.formatEther(balance));
      setSymbol(symbol);
      setCurrency(name);
      setTokenChanged(true);
      setErcLodaing(false);

      }
      else{
        toast.warn("please enter details");
      }
    } catch (err) {
      toast.error(err.message);
      setErcLodaing(false);
    }
  }

  async function removeToken() {
    try {
      setErcLodaing(true);
      setErcTokenAddress('');
      setBalance(ethers.utils.formatEther(await signer.getBalance())?.slice(0, 5));

      if (chain == 'Ropsten') {

        setCurrency("RopstenEther")
        setSymbol("Eth")
        setErcLodaing(false);
        setTokenChanged(false);

      } else if (chain == 'Rinkeby') {

        setCurrency("RinkebyEther")
        setSymbol("Eth")
        setErcLodaing(false);
        setTokenChanged(false);

      } else if (chain == 'Goerli') {

        setCurrency("GoerliETH");
        setSymbol("Eth");
        setErcLodaing(false);
        setTokenChanged(false);
      }
      else {
        
        setLogin(false);
      }

    } catch (err) {
      toast.error(err.message);
    }

  }
  async function saveTx() {
    setSaveTxLoad(true);
    try {

      const tx = await PaypalContract.saveTransactions(recentTx.from, recentTx.to, ethers.utils.parseEther(recentTx.amount), recentTx.symbol);
      await tx.wait();
      setRecipientAddress('');
      setAmount('');
      setSaveTxLoad(false);
      setShowRecentTx(false);
      toast.success("Transaction Saved Successfully");
    } catch (err) {
      toast.error(err.message);
      setSaveTxLoad(false);
    }
  }
  function nosaveTx() {
    setRecipientAddress('');
    setAmount('');
    setShowRecentTx(false);
  }

  async function TransferAmount() {
    try {
      if(recipientAddress && amount){
      setTxLoading(true);
      if (tokenChanged) {
        if (amount < balance) {
          const tx = await ERCContract.transfer(recipientAddress, ethers.utils.parseEther(amount));
          await tx.wait();
          setRecentTx({
            txhash: tx.hash,
            from: account,
            to: recipientAddress,
            amount: amount,
            symbol: symbol
          })
          selectToken();
          setShowRecentTx(true);
        }
      } else {
        if (amount < balance) {
          const tx = await PaypalContract.transactions(recipientAddress, symbol, {
            value: ethers.utils.parseEther(amount)
          });
          await tx.wait();
          getBalance();
          setRecipientAddress('');
          setAmount('');
        }
      }
      setTxLoading(false);

        toast.success("Transaction Success");
    } 
    else{
        toast.warn("please Enter details");
    }

    } catch (err) {
      toast.error(err.message);
      setTxLoading(false);
    }

  }


  useEffect(() => {
    getAccount();

  }, [])
  useEffect(() => {

    checkAccount();

  }, [account])


  return (
    <div className="min-w-full h-screen">
      <AppState.Provider value={{
        login, setLogin, account, setAccount,
        getBalance, symbol, setSymbol, chain, setChain, balance,
        setBalance, currency, setCurrency, ercTokenAddress, setErcTokenAddress,
        setRecipientAddress, setAmount, amount, recipientAddress, setpaypalContractAddress,
        setExplorer, tokenChanged, setTokenChanged, paypalContractAddress,
        showErc, setShowErc, ercLoading, setErcLodaing, txLoading, setTxLoading,
        saveTxLoad, setSaveTxLoad, showRecentTx, setShowRecentTx,
        selectToken, removeToken, TransferAmount, saveTx, nosaveTx, PaypalContract, Explorer,
        img,setImg,data,setData
      }}>
        {login ?
          <div className="min-w-full min-h-full">
            {/* Main Application */}
            <ToastContainer />
            <Header address={account} />
            <Main />
            {/* <h1 className="text-white">{account}</h1> */}
          </div>
          :
          <Login />
        }
      </AppState.Provider>
    </div>
  );
}

export default App;
export { AppState };