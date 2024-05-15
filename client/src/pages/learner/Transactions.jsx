import React, { useEffect, useState } from 'react'
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';

const Transactions = () => {
  const [myTxs, setMyTx] = useState([])

  const getMyTransactions = async () => {
    try {
      const resp = await authAxios.get(`${apiUrl}/pay/my`)
      console.log(resp.data);
      setMyTx(resp.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyTransactions()
  }, [])
  return (
    <div>
      <h1>My Transactions</h1>


      <div>
        {
          myTxs.map((t) => (
            <div className='flex items-center justify-between px-4 py-2 border my-2 bg-red-400 rounded-xl'>
              <div>
                {t.name}
              </div>
              <div className='text-right'>
                {t.price}
                <br />
                <span className='text-xs text-gray-300'>{t?.createdAt ? new Date(t?.createdAt).toDateString() : new Date().toDateString()}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Transactions