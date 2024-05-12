import React, { useEffect, useState } from 'react'
import done from '../../assets/done.svg'
import { useNavigate } from 'react-router-dom';
const PaymentSuccess = () => {
    const [seconds, setSeconds] = useState(5);
    const navigate = useNavigate()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    setTimeout(() => {
                        navigate("/learner");
                    }, 3000)
                    navigate("/learner");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {clearInterval(intervalId)};
    }, [])
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-full md:w-1/2'>
                <img src={done} className='w-full' />
            </div>
            <h1>Payment Success!</h1>
            <p>You will redirect to the dashboard after {seconds} seconds</p>
        </div>
    )
}

export default PaymentSuccess