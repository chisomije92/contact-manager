import Link from "next/link";
import React, { CSSProperties, useEffect, useState } from "react";
import Input from "../Input";
import { useRouter } from "next/router";
import { authenticateUser } from "@/utils/auth";
import Image from "next/image";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import { baseURL } from "@/helpers/api";

export type authErrorType = {
  email: string | null;
  password: string | null;
  name: string | null;
};

const override: CSSProperties = {
  display: "block",
  borderColor: "red",
};

const AuthForm = () => {
  const router = useRouter();
  const { pathname } = router;
  const showLogin = pathname === "/login";
  const [formData, setFormData] = useState({
    name: showLogin ? "name" : "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<authErrorType>({
    email: null,
    password: null,
    name: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  // Check overall form validity and update isFormValid state
  useEffect(() => {
    const checkForFormValidity = (data: any) => {
      return (
        isValidEmail(data.email) &&
        data.password.length >= 5 &&
        (!showLogin ? data.name.length > 1 : true)
      );
    };
    setIsFormValid(checkForFormValidity(formData));
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

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target;
    let error = null;

    // Validation logic
    switch (name) {
      case "name":
        error =
          !showLogin && value.trim() === ""
            ? "Name is required (Enter at least 2 characters)"
            : null;
        break;
      case "email":
        // Basic email validation
        error = !isValidEmail(formData.email) ? "Invalid email address" : "";
        break;
      case "password":
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
    let credentials: any;
    setAuthError(null);
    if (isFormValid && showLogin) {
      setLoading(true);
      try {
        credentials = {
          email: formData.email,
          password: formData.password,
        };
        setFormData({
          email: "",
          password: "",
          name: "",
        });
        await authenticateUser(router, credentials, `${baseURL}/auth/login`);
      } catch (err: any) {
        setLoading(false);
        if (err.response.status === 401) {
          setAuthError("Invalid email or password");
        }
        if (err.response.status === 404) {
          setAuthError("Please proceed to register first!");
        } else {
          setAuthError("Login failed. Please try again later!");
        }

        console.log(err);
      }
    }
    if (isFormValid && !showLogin) {
      setLoading(true);
      credentials = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      setFormData({
        email: "",
        password: "",
        name: "",
      });
      try {
        const response = await axios.post(
          `${baseURL}/auth/register`,
          credentials
        );

        localStorage.setItem("tokenExpiration", response.data.tokenExpiration);
        localStorage.setItem("id", response.data.id);
        router.push("/verify-email");
      } catch (err: any) {
        setLoading(false);
        err.response.status === 409
          ? setAuthError("User exists already. Please sign in")
          : setAuthError("Error registering user. Please try again later!");
        console.log(err);
      }
    }
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
          {showLogin
            ? "Sign in to your account"
            : "Register to enjoy the benefits"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!showLogin && (
            <Input
              id="name"
              name="name"
              type="text"
              labelText="Name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className2="mt-2"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          )}
          {errors.name !== "" && formData.name.length < 1 && (
            <span className="text-red-400">{errors.name}</span>
          )}
          <Input
            id="email"
            name="email"
            type="email"
            labelText="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className2="mt-2"
            labelClassName="block text-sm font-medium leading-6 text-gray-900"
            inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.email !== "" && !isValidEmail(formData.email) && (
            <span className="text-red-400">{errors.email}</span>
          )}
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
          {showLogin && (
            <div className="text-sm flex justify-end">
              <Link
                href="/reset-password"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          )}
          <div>
            <button
              disabled={!isFormValid || loading}
              type="submit"
              className="flex disabled:bg-gray-400 disabled:cursor-not-allowed w-full justify-center rounded-md enabled:bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading && (
                <CircleLoader
                  color={color}
                  loading={loading}
                  cssOverride={override}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
              {showLogin ? "Login" : "Register"}
            </button>
          </div>
          {authError && <span className="text-red-600">{authError}</span>}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {showLogin ? "Not a user? " : "A user already? "}
          <Link
            href={!showLogin ? "/login" : "/register"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {!showLogin ? "Login" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
