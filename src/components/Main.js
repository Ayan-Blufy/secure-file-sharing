import React, { useState } from 'react'
import Send from './Send'
import Recipient from './Recipient'
import RecentTx from './RecentTx'
import GlobalTx from './GlobalTx'

const Main = () => {
    const [route, setRoute] = useState('send');

    return (
        <div className='w-full mt-[20%] sm:mt-[5%]   flex flex-col justify-center items-center'>
            <div className='flex justify-between text-sm sm:text-lg font-medium items-center bg-gray-900 border-2 border-b-0 text-white border-opacity-50 border-blue-800 rounded-t-lg w-[80%] sm:w-1/2 '>
                {/* send */}
                <div onClick={() => setRoute('send')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'send' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
                    File
                </div>
                {/* Recipients */}
                <div onClick={() => setRoute('recipients')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'recipients' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
                    Dictionary
                </div>
                {/* Recent Tx */}
                <div onClick={() => setRoute('recent_tx')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'recent_tx' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
                    Recent Files
                </div>
                {/* Global Tx */}
                
            </div>
            {/* Screen */}
            <div className='bg-black bg-opacity-60 px-4 py-4 mb-10 pb-5 overflow-y-auto border-2 border-t-0 shadow-lg border-opacity-50 border-blue-800 rounded-b-lg w-[90%] sm:w-1/2'>
                {(() => {
                    if (route == 'send') {
                        return <Send />
                    } else if (route == 'recipients') {
                        return <Recipient />
                    } else if (route == 'recent_tx') {
                        return <RecentTx />
                    } 
                })()}
            </div>

        </div>
    )
}

export default Main