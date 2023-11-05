import React, { useEffect, useState } from "react";
import Input from "../Input";
import Image from "next/image";
import { useRouter } from "next/router";
import { authenticateUser } from "@/utils/auth";

const ChangePassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [errors, setErrors] = useState<{
    password: string | null;
    confirmPassword: string | null;
  }>({
    password: null,
    confirmPassword: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  // Check overall form validity and update isFormValid state
  useEffect(() => {
    const checkForFormValidity = (data: any) => {
      return data.password.length >= 5 && data.confirmPassword.length >= 5;
    };
    setIsFormValid(
      Object.values(errors).every((error) => {
        return !error;
      }) && checkForFormValidity(formData)
    );
  }, [formData, errors]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authError) timer = setTimeout(() => setAuthError(null), 5000);

    return () => timer && clearTimeout(timer);
  }, [authError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target;
    let error = null;

    // Validation logic
    switch (name) {
      case "password":
        error =
          value.length < 5 ? "Password must be at least 5 characters long" : "";
        break;
      case "confirmPassword":
        error =
          value.length < 5 ? "Password must be at least 5 characters long" : "";
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const credentials = {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      setFormData({
        password: "",
        confirmPassword: "",
      });
      await authenticateUser(
        router,
        credentials,
        `http://localhost:8000/api/auth/finish-reset/${token}`
      );
      router.push("/contacts");
    } catch (err: any) {
      if (err.response.status === 404) {
        setAuthError("Email not found! Please register your account");
      }
      if (err.response.status === 400) {
        setAuthError("Passwords do not match");
      } else {
        setAuthError("Password reset attempt failed. Please try again later!");
      }

      console.log(err.response);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            id="password"
            name="password"
            type="password"
            labelText="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className2="mt-2"
            labelClassName="block text-sm font-medium leading-6 text-gray-900"
            inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.password !== "" && formData.password.length < 5 && (
            <span className="text-red-400">{errors.password}</span>
          )}
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            labelText="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className2="mt-2"
            labelClassName="block text-sm font-medium leading-6 text-gray-900"
            inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.confirmPassword !== "" &&
            formData.confirmPassword.length < 5 && (
              <span className="text-red-400">{errors.confirmPassword}</span>
            )}
          <div>
            <button
              disabled={!isFormValid || loading}
              type="submit"
              className="flex disabled:bg-gray-400 disabled:cursor-not-allowed w-full justify-center rounded-md enabled:bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Change Password
            </button>
          </div>
          {authError && <span className="text-red-600">{authError}</span>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
