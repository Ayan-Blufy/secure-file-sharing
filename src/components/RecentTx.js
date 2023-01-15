import React,{useEffect, useState,useContext} from 'react'
import  {ethers} from "ethers"
import { AppState } from '../App';

const RecentTx = () => {
 

  const { login, setLogin, account, setAccount, symbol, chain, ercTokenAddress, setErcTokenAddress,
    setChain, setSymbol, balance, setBalance, paypalContractAddress, currency, setCurrency, tokenChanged
    , setTokenChanged, setRecipientAddress, setAmount, amount, recipientAddress,
    showErc, setShowErc, ercLoading, setErcLodaing, txLoading, setTxLoading,
    saveTxLoad, setSaveTxLoad, showRecentTx, setShowRecentTx, selectToken, removeToken, TransferAmount,
    saveTx, nosaveTx, img, setImg, setData, data
  } = useContext(AppState);
    

  return (
    <div className='flex flex-col items-center justify-center p-3 text-white'>
      <div className="h-[400px] w-full flex flex-col items-center  overflow-y-scroll overflow-x-hidden scrollbar-hide tracking-wide ">
      
        <img src={`https://fetch.infura-ipfs.io/ipfs/${data}`} alt="" width="200px"/>

      </div>
    </div>
  )
}

export default RecentTx
