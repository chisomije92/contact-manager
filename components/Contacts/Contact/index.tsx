import Link from "next/link";
import React, { FC, useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export type ContactType = {
  id: string | number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const Contact: FC<ContactType> = ({ id, firstName, lastName, phoneNumber }) => {
  return (
    <li key={id} className="flex justify-between gap-x-9 py-5 sm:px-42 px-20">
      <div className="flex  gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {firstName} {lastName}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {phoneNumber}
          </p>
        </div>
      </div>
      <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
        <div className="flex justify-between">
          <Link
            href={`/edit-contact/${id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            Edit
          </Link>
          <Link
            href={`/contacts/${id}`}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            View
          </Link>
        </div>
      </div>
    </li>
  );
};

export default Contact;
