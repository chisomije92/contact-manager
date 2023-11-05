import { authenticateUser } from "@/utils/auth";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import VerificationInput from "react-verification-input";

const EmailVerify = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [remainingTime, setRemainingTime] = useState(10);
  const [tokenExpiration, setTokenExpiration] = useState(0);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("tokenExpiration")) {
      const duration = localStorage.getItem("tokenExpiration");
      duration && setTokenExpiration(+duration);
    }
  }, [remainingTime]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentTime = new Date().getTime();
      return Math.max(0, tokenExpiration - currentTime);
    };
    const timer = setTimeout(() => {
      const newTimeRemaining = calculateTimeRemaining();
      if (newTimeRemaining <= 0) {
        clearInterval(timer);
        setRemainingTime(0);
      } else {
        setRemainingTime(newTimeRemaining);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime, tokenExpiration]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authError) timer = setTimeout(() => setAuthError(null), 5000);

    return () => timer && clearTimeout(timer);
  }, [authError]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleRequestNewCode = async () => {
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.post(
        `http://localhost:8000/api/auth/update-token/${userId}`
      );
      localStorage.setItem("tokenExpiration", response.data.tokenExpiration);
      window.location.reload();
    } catch (err: any) {
      err.response.status === 409
        ? setAuthError("User exists already. Please sign in")
        : setAuthError("Error registering user. Please try again later!");
      console.log(err);
    }
  };

  const handleProceed = async () => {
    try {
      await authenticateUser(
        router,
        {},
        `http://localhost:8000/api/auth/verify-user/${token}`
      );
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("id");
    } catch (err: any) {
      err.response.status === 409
        ? setAuthError("User exists already. Please sign in")
        : setAuthError("Error registering user. Please try again later!");
      console.log(err);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <span className="flex items-center justify-center w-full mx-auto ">
        <Image
          src="/Contacts.svg"
          width={50}
          alt="Hux contact manager"
          height={50}
          className="h-10 w-auto mr-28"
        />
      </span>
      <h3 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-4xl text-center -ml-28">
        Verify Email
      </h3>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <VerificationInput length={5} onChange={setToken} />
        </div>
        <div className="text-2xl font-bold tracking-tight text-gray-700 text-center -ml-20 mt-4">
          {formatTime(remainingTime)}
        </div>
        <div>
          <button
            disabled={token.length < 5}
            className="flex disabled:bg-gray-400 disabled:cursor-not-allowed w-80 mt-6 justify-center rounded-md enabled:bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
        {authError && <span className="text-red-600">{authError}</span>}
      </div>
      <span
        className="text-1xl font-medium tracking-tight text-gray-500 text-center -ml-28 cursor-pointer mt-2"
        onClick={handleRequestNewCode}
      >
        <p>Didn`t receive code? Request new code</p>
      </span>
    </div>
  );
};

export default EmailVerify;
