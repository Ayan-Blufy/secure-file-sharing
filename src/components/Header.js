import React, { useEffect, useState,useContext } from 'react'
import paypal from "../images/images.png";
import { ethers } from 'ethers';
import ethereumsvg from '../images/ethereum-eth.svg';
import { AppState } from '../App';
import Pay from '../images//Pay.png'
const Header = ({ address }) => {

  
    const { login, setLogin, account, setAccount,
         symbol, setSymbol, chain, setChain, balance,
        setBalance, currency, setCurrency, ercTokenAddress, setErcTokenAddress,
        setRecipientAddress, setAmount, amount, recipientAddress, setpaypalContractAddress,
        setExplorer, tokenChanged, setTokenChanged, paypalContractAddress,
        showErc, setShowErc, ercLoading, setErcLodaing, txLoading, setTxLoading,
        saveTxLoad, setSaveTxLoad, showRecentTx, setShowRecentTx,
        selectToken, removeToken, TransferAmount, saveTx, nosaveTx, PaypalContract, Explorer } = useContext(AppState);

    
    const [chainId,setChainId]=useState('');

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

    async function getChain(){
        try{
       
            const chainID = await window.ethereum.request({ method: "eth_chainId" });
            setChainId(chainID);
              
           if (chainID == "0x5") {
                setChain("Goerli")
                setCurrency("GoerliETH")
                setSymbol("Eth")
                setLogin(true);
              
                setpaypalContractAddress(process.env.REACT_APP_Goerli);
                setExplorer("https://goerli.etherscan.io")
            }
             else {
                // setError("Can only access with Ropsten, Rinkeby,Goerli, Polygon Mumbai")
                setLogin(false);
            }
            

        }catch(err){
            console.log(err);
        }
    }   

    async function checkChain(){
        try{
            await window.ethereum.on('chainChanged',()=>{
                // getChain();
                // getBalance();
                window.location.reload();
            });
        }catch(err)
        {
            console.log(err);
        }
    }

    useEffect(()=>{
        getChain();
    },[]);


    useEffect(()=>{
        checkChain();
    },[chainId])

    return (
        <div className="w-full h-1/4 pt-4 flex justify-between items-start">
            {/* Logo */}
            <img className="h-12  " src={paypal} />

            <div className="flex justify-between items-start">
                {/* Wallet */}
                <div className="text-sm sm:text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black px-4 py-2 text-white rounded-lg flex justify-between items-center">
                    {address?.slice(0, 8)}...{address?.slice(38)}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="ml-2 bi bi-wallet2"
                        viewBox="0 0 16 16"
                    >
                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                    </svg>
                </div>

                {/* Chains Section */}
                <div className="text-sm sm:text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black text-white rounded-lg flex justify-between items-center">
                    
                        <img className="h-6 mr-2" src={ethereumsvg} />
                    
                   
                    {chain}
                </div>

                {/* All Chains */}



            </div>
        </div>
    )
}

export default Header
