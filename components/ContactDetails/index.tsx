import ColorsComponent from "@/ui/ColorComponent";
import Link from "next/link";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const ContactDetails = () => {
  return (
    <section>
      <Header />
      <ColorsComponent />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Contact Details
          </h2>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="bg-gray-100 h-40 w-full"></div>

          <div className="p-6">
            <div className="text-xl font-semibold">Chisom Ijeomah</div>
            <div className="text-gray-500">555 - 555 - 555</div>
          </div>

          <div className="flex justify-between p-6">
            <Link
              href={"/edit-contact"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button className="bg-red-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ContactDetails;
