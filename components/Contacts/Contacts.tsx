import React from "react";
import Header from "../Header";
import { useRouter } from "next/router";
import ColorsComponent from "@/ui/ColorComponent";
import Link from "next/link";
import Contact from "./Contact";

const people = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123-456-7890",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "234-567-8901",
  },
  {
    id: 3,
    firstName: "James",
    lastName: "Johnson",
    phoneNumber: "345-678-9012",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Williams",
    phoneNumber: "456-789-0123",
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Brown",
    phoneNumber: "567-890-1234",
  },
  {
    id: 6,
    firstName: "Sarah",
    lastName: "Davis",
    phoneNumber: "678-901-2345",
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Miller",
    phoneNumber: "789-012-3456",
  },
];

const Contacts = () => {
  const router = useRouter();
  return (
    <section className="">
      <Header />
      <ColorsComponent />
      <div className="translate-y-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center ">
          Contacts Manager
        </h1>
      </div>
      <div className="flex justify-end translate-y-28 mr-5">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-36 mr-2 "
          type="button"
          onClick={() => router.push("/create-contact")}
        >
          Create Contact
        </button>
      </div>
      {people.length < 1 && (
        <div className="translate-y-32">
          <h1 className="text-3xl font-bold tracking-tighter text-gray-700 text-center ">
            No contacts yet. You may proceed to create your contact.
          </h1>
        </div>
      )}
      <ul role="list" className="divide-y divide-gray-100 translate-y-32">
        {/* {people.map((person) => (
          <Contact
            id={person.id}
            key={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
            phoneNumber={person.phoneNumber}
          />
        ))} */}
      </ul>
    </section>
  );
};

export default Contacts;
