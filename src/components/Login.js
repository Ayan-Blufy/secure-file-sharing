import React, { useState, useContext } from 'react'

import paypal from '../images/images.png'
import metamask from '../images/metamask.png';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppState } from '../App';
import Pay from '../images//Pay.png'

const Login = () => {

    const [error, setError] = useState('');
    const { login, setLogin, account, setAccount, symbol, chain, setChain, setSymbol, setExplorer, setpaypalContractAddress, balance, setBalance, currency, setCurrency } = useContext(AppState);
    async function connectWallet() {
        try {
           
                await window.ethereum?.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] })
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const chainId = await window.ethereum.request({ method: "eth_chainId" });
                 if (chainId == "0x5") {
                    setChain("Goerli")
                    setCurrency("GoerliETH")
                    setSymbol("Eth")
                    setLogin(true);
                    setpaypalContractAddress(process.env.REACT_APP_Goerli);
                    setExplorer("https://goerli.etherscan.io")
                }
                else {
                    setError("Can only access with Ropsten, Rinkeby,Goerli, Polygon Mumbai")
                    setLogin(false);
                }
                setAccount(accounts[0]);



                toast.success("Login Successfully")
                setLogin(true);
           
        } catch (err) {
            // setError(`"${err.message}"`)
            toast.error(err.message);
        }
    }



    return (
        <>
      
            <div className='min-w-full h-4/5 flex justify-center flex-col items-center'>
                <img className='h-20' src={paypal} />
                <div className='w-[80%] md:w-1/3 h-40 mt-4 bg-black bg-opacity-70 p-2 rounded-lg shadow-lg border-opacity-40 border-4 border-black flex flex-col justify-center items-center'>
                    <h1 className='text-white text-2xl font-medium text-center'>Login</h1>
                    {window?.ethereum != undefined ?
                        <div onClick={connectWallet} className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2'>
                            Connect With Metamask
                            <img className='h-10' src={metamask} />
                        </div>
                        :
                        <div className='flex flex-col justify-center items-center'>
                            {/* install Metamask */}
                            
                            <a target={"_blank"} href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
                                <div className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2'>
                                    Install Metamask
                                    <img className='h-10' src={metamask} />
                                </div>
                            </a>
                            <p className='text-red-600 text-lg mt-2'>Login Required Metamask Extension</p>
                        </div>
                    }
                    {/* <p className='text-red-600 text-lg mt-2'>{error}</p> */}
                </div>
            </div>
        </>
    )
}

export default Login
