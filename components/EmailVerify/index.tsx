import Image from "next/image";
import React, { useEffect, useState } from "react";

import VerificationInput from "react-verification-input";

const EmailVerify = () => {
  const [token, setToken] = useState("");
  const [remainingTime, setRemainingTime] = useState(1800);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemainingTime((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClick = () => {};
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
            className="flex disabled:bg-gray-400 disabled:cursor-not-allowed w-80 mt-6 justify-center rounded-md enabled:bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleClick}
          >
            Proceed
          </button>
        </div>
      </div>
      <span className="text-1xl font-medium tracking-tight text-gray-500 text-center -ml-28 cursor-pointer mt-2">
        <p>Didn`t receive code? Request new code</p>
      </span>
    </div>
  );
};

export default EmailVerify;
