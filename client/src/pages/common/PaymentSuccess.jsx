import React, { useEffect, useState } from "react";
import done from "../../assets/done.svg";
import { useNavigate } from "react-router-dom";
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/user/loggedInUser`);
      setUser(response.data);
      sendSmsNotification(response.data); // Call sendSmsNotification after setUser
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("user profile not found.");
      } else {
        // toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const sendSmsNotification = async (obj) => {
    try {
      console.log(obj)
      const payload = {
        to: obj.email,
        subject:"enrolled to course",
        text: "Your payment was successful and you are enrolled in the course",
      };
      await authAxios.post(`${apiUrl}/notification/sendemail`, payload);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("user profile not found.");
      } else {
        // toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };
  

  const redirectToDashboard = () => {
    navigate("/learner");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserDetails();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setTimeout(() => {
            redirectToDashboard();
          }, 3000);
          redirectToDashboard();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full md:w-1/2">
        <img src={done} className="w-full" alt="Payment Success" />
      </div>
      <h1>Payment Success!</h1>
      <p>You will be redirected to the dashboard after {seconds} seconds</p>
    </div>
  );
};

export default PaymentSuccess;
