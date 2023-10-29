import Link from "next/link";
import React from "react";
import Input from "../Input";
import { useRouter } from "next/router";
import ColorsComponent from "@/ui/ColorComponent";
import Header from "../Header";
import Footer from "../Footer";

const ContactForm = () => {
  const router = useRouter();
  const showCreateContact = router.pathname === "/create-contact";
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
          <form className="space-y-6" action="#" method="POST">
            <Input
              id="firstName"
              name="firstName"
              type="text"
              labelText="First Name"
              className2="mt-2"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <Input
              id="lastName"
              name="lastName"
              type="text"
              labelText="Last Name"
              className2="mt-2"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              labelText="Phone Number"
              className2="mt-2"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              inputClassName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {showCreateContact ? "Create Contact" : "Edit Contact"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ContactForm;
