import Image from "next/image";
import React, { useState } from "react";
import Input from "../Input";
import axios from "axios";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleProceed = async () => {
    setLoading(true);
    setEmail("");
    try {
      await axios.post("http://localhost:8000/api/auth/reset-password", {
        email,
      });
    } catch (err: any) {
      if (err.response.status === 404) {
        setAuthError("Email not found! Please register your account");
      } else {
        setAuthError("Password reset attempt failed. Please try again later!");
      }

      console.log(err.response);
    }
    setLoading(false);
  };
  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/Contacts.svg"
          width={50}
          alt="Hux contact manager"
          height={50}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Input
          id="email"
          name="email"
          type="email"
          labelText="Email Address"
          value={email}
          onChange={handleInputChange}
          className2="mt-2 mb-3"
          labelClassName="block text-sm font-medium leading-6 text-gray-900"
          inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div>
          <button
            disabled={!isValidEmail(email) || loading}
            onClick={handleProceed}
            className="flex disabled:bg-gray-400 disabled:cursor-not-allowed w-full justify-center rounded-md enabled:bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Proceed
          </button>
        </div>
        {authError && <span className="text-red-600">{authError}</span>}
      </div>
    </section>
  );
};

export default ResetPassword;
