import React, { useState, useContext, useEffect } from 'react'
import { AppState } from '../App';
import { ethers } from 'ethers';
import contract from '../paypal/paypal.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Recipient = () => {
  const { paypalContractAddress, PaypalContract, account, setRecipientAddress } = useContext(AppState);
  // const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  // const signer = provider.getSigner();
  // const PaypalContract = new ethers.Contract(paypalContractAddress, contract.output.abi, signer);



  const [recipientsAddress, setRecipientsAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([])
  const [num, setNum] = useState(0)
  useEffect(()=>{
    async function getData(){
      try{
        const recipients = await PaypalContract.filters.recipients(account);
        const recipientData=await PaypalContract.queryFilter(recipients);
   
        setData(recipientData);

      }catch(err){
        toast.error(err.message);
      }
    }
    getData();

  },[])


  async function addRecepients() {
    try {
      if (recipientsAddress && recipientName) {
        const tx = await PaypalContract.addRecipient(recipientsAddress, recipientName);
        await tx.wait();
        toast.success("Recipient Added Successfully");
        setNum(num+=1);
        setRecipientsAddress('');
        setRecipientName('');
      }
      else{
        toast.error("please Enter details");
      }


    } catch (err) {
      toast.error(err.message);
    }
  }

  function setData1(name,address){
    toast.success(`${name} address is added`)
    setRecipientAddress(address);
  }

  return (
    <div className='flex flex-col items-center justify-center py-3 px-4 text-white'>
      <input onChange={(e) => setRecipientsAddress(e.target.value)} value={recipientsAddress} className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste Recipient Name"  />

      <input onChange={(e) => setRecipientName(e.target.value)} value={recipientName} className="mt-2 w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste File Encode" />

      <div onClick={addRecepients} className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
        Add Recipient
      </div>

      <p className="text-red-600 text-lg mt-2 px-3">{error}</p>
      <p className="text-green-600 text-lg mt-2 px-1">{message}</p>

      <div className='flex flex-col items-center justify-center mt-4 w-full'>
        <div className="h-[150px] w-full flex flex-col items-center  overflow-y-scroll overflow-x-hidden scrollbar-hide tracking-wide ">
        {data.map((e,i) => {
          return (
            <div onClick={() => setData1(e.args.recipientname, e.args.recipient)} className={`bg-black cursor-pointer rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-3/4 mt-2`} key={i}>
              <div className="flex w-full items-center justify-center rounded-t-lg">
                <div className="w-full py-2 px-4 text-sm sm:text-md">
                  <p className="text-xl font-mono">Name: {e.args.recipientname}</p>
                  <p className="text-xs font-mono">address: {e.args.recipient.slice(0, 8)}....{e.args.recipient.slice(38)}</p>
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}

export default Recipient
