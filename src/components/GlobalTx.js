import React, { useEffect, useState, useContext } from 'react'
import { ethers } from "ethers"
import { AppState } from '../App';

const GlobalTx = () => {
  const [data, setData] = useState([]);
  const { paypalContractAddress, PaypalContract, account, setRecipientAddress, Explorer } = useContext(AppState);

  useEffect(() => {
    async function getData() {
      try {
        const recipients = await PaypalContract.filters.transactionsData();
        const recipientData = await PaypalContract.queryFilter(recipients);

        setData(recipientData);

      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, [])

  return (
    <div className='flex flex-col items-center justify-center p-3 text-white '>
      <div className="h-[400px] w-full flex flex-col items-center  overflow-y-scroll overflow-x-hidden scrollbar-hide tracking-wide ">
      {data.map((e, i) => {
        return (
          <div className={`bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`} key={i}>
            <div className="flex w-full items-center justify-center rounded-t-lg">
              <div className="w-full py-2 px-2">
                <p className="text-xl font-mono">Amount: {ethers.utils.formatEther(e.args.amount)} {e.args.symbol}</p>
                <p className="text-xs font-mono">to: {e.args.to}</p>
              </div>
            </div>
            <a target={'_blank'} href={`${Explorer}/tx/${e.transactionHash}`}>
              <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
                View Transaction
              </div>
            </a>
          </div>

        )
      })}
      </div>
    </div>
  )
}

export default GlobalTx
