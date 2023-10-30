import React, { useEffect, useState, CSSProperties } from "react";
import Header from "../Header";
import { useRouter } from "next/router";
import ColorsComponent from "@/ui/ColorComponent";
import Link from "next/link";
import Contact, { ContactType } from "./Contact";
import api from "@/helpers/api";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../Footer";

export const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop: "80px",
  borderColor: "blue",
};

const Contacts = () => {
  const [contacts, setContacts] = useState<
    {
      id: number;
      first_name: string;
      last_name: string;
      phone_number: string;
    }[]
  >([]);

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get("/contacts");
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContacts();
  }, []);
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
      {loading && (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {!loading && contacts.length < 1 && (
        <div className="translate-y-32">
          <h1 className="text-3xl font-bold tracking-tighter text-gray-700 text-center ">
            No contacts yet. You may proceed to create your contact.
          </h1>
        </div>
      )}
      {!loading && contacts.length > 0 && (
        <ul role="list" className="divide-y divide-gray-100 translate-y-32">
          {contacts.map((person) => (
            <Contact
              id={person.id}
              key={person.id}
              firstName={person.first_name}
              lastName={person.last_name}
              phoneNumber={person.phone_number}
            />
          ))}
        </ul>
      )}
      <Footer />
    </section>
  );
};

export default Contacts;
