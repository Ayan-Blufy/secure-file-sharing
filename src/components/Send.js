import React, { useState, useContext } from 'react'
import { Bars, TailSpin } from "react-loader-spinner";
import { AppState } from "../App";
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const Send = () => {
  

 
  const [isuploaded,setUploaded]=useState(false);

  const { login, setLogin, account, setAccount, symbol, chain, ercTokenAddress, setErcTokenAddress,
    setChain, setSymbol, balance, setBalance, paypalContractAddress, currency, setCurrency, tokenChanged
    , setTokenChanged, setRecipientAddress, setAmount, amount, recipientAddress,
    showErc, setShowErc, ercLoading, setErcLodaing, txLoading, setTxLoading,
    saveTxLoad, setSaveTxLoad, showRecentTx, setShowRecentTx, selectToken, removeToken, TransferAmount,
    saveTx, nosaveTx,img,setImg,setData,data
  } = useContext(AppState);


  const projectId ="2ISRnzy3H5HAiJiv9IXGLzi5c7r";
  const projectSecret ="75108b087c87af931c753c3a73a0f08f";



  const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
    "base64"
  )}`;

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  });
  async function solve(){
    if (img !== "") {
      try {

        const added = await client.add(img);
        const { path } = added;

      
        toast.success(path);
        setData(path);
        setUploaded(true);


      } catch (err) {
        console.log(err);
        toast.error("error accoured while uploading");
      }
    }
  }

  function solve1(e)
  {
   setImg(e.target.files[0]);
  }


  return (
    <div className="flex flex-col justify-center items-center text-white ">

      <div className="my-4 border-white text-sm font-medium text-sky-100 p-4 ">

       
        <input type="file" onChange={solve1} className="mt-1 px-3 py-2  outline-none bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Please Select a pic" accept='image/*' onClick={solve1} />

      </div>
      
      {!isuploaded ?
        <button className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg" onClick={solve}>
          Upload Files to IPFS
        </button> :
        <button className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg" onClick={solve}>
          Files uploaded Sucessfully
        </button>}
        
      <div className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-violet-600 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
          <h1>{data!=""?data:"Loading...."}</h1>
        </div>


    </div>


  )
}

export default Send
