import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useRouter } from "next/router";
import ColorsComponent from "@/ui/ColorComponent";
import Header from "../Header";
import Footer from "../Footer";
import api from "@/helpers/api";
import withAuthentication from "@/hocs/WithAuthentication";

type errorType = {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
};

const ContactForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const showCreateContact = router.pathname === "/create-contact";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<errorType>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Check overall form validity and update isFormValid state
  useEffect(() => {
    setIsFormValid(Object.values(formData).every((value) => value !== ""));
  }, [formData, errors]);

  useEffect(() => {
    const getContactDetails = async () => {
      try {
        const response = await api.get(`/contacts/${id}`);
        const data = response.data[0];
        console.log(data);
        setFormData({
          firstName: data.first_name,
          lastName: data.last_name,
          phoneNumber: data.phone_number,
        });
      } catch (err: any) {
        if (err.response.status === 500) {
          router.replace("/contacts");
        }
        console.log(err);
      }
    };
    !showCreateContact && getContactDetails();
  }, [showCreateContact, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInput = (name: string, value: string) => {
    switch (name) {
      case "firstName":
        return value.trim() === "" ? "First Name is required" : "";
      case "lastName":
        return value.trim() === "" ? "Last Name is required" : "";
      case "phoneNumber":
        return !/^\d{10}$/.test(value)
          ? "Invalid phone number (10 digits required)"
          : "";
      default:
        return "";
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target;

    // Validation logic
    const error = validateInput(name, value);

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let credentials = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
    };
    if (showCreateContact && isFormValid) {
      try {
        const response = await api.post(`/contacts`, credentials);
        console.log(response);
        router.push("/contacts");
      } catch (err: any) {
        err.response.status === 401 && setFetchError("Invalid inputs");
        err.response.status === 400 && setFetchError(err.response.data.message);
        setTimeout(() => {
          setFetchError(null);
        }, 4000);
        console.log(err);
      }
    }

    if (!showCreateContact && isFormValid) {
      try {
        await api.put(`/contacts/${id}`, credentials);
        router.push("/contacts");
      } catch (err: any) {
        err.response.status === 401 && setFetchError("Invalid inputs");
        console.log(err);
      }
    }
  };
  return (
    <section>
      <Header />
      <ColorsComponent />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {showCreateContact ? "Create contact" : "Edit contact"}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              labelText="First Name"
              className2="mt-2"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.firstName !== "" && formData.firstName.length < 1 && (
              <span className="text-red-400">{errors.firstName}</span>
            )}

            <Input
              id="lastName"
              name="lastName"
              type="text"
              labelText="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className2="mt-2"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.lastName !== "" && formData.lastName.length < 1 && (
              <span className="text-red-400">{errors.lastName}</span>
            )}
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              labelText="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className2="mt-2"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.phoneNumber !== "" && formData.phoneNumber.length < 1 && (
              <span className="text-red-400">{errors.phoneNumber}</span>
            )}
            <div>
              <button
                type="submit"
                className="flex disabled:bg-gray-400 disabled:cursor-not-allowed w-full justify-center rounded-md enabled:bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!isFormValid}
              >
                {showCreateContact ? "Create Contact" : "Edit Contact"}
              </button>
            </div>
            {fetchError && <span className="text-red-600">{fetchError}</span>}
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default withAuthentication(ContactForm);
