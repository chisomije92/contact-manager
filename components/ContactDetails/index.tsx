import ColorsComponent from "@/ui/ColorComponent";
import Link from "next/link";
import React, { useEffect, useState, CSSProperties } from "react";
import Header from "../Header";
import Footer from "../Footer";
import api from "@/helpers/api";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import { override } from "../Contacts";
import withAuthentication from "@/hocs/WithAuthentication";

const ContactDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState<{
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
  }>({
    id: 0,
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get(`/contacts/${id}`);
        setContact(response.data[0]);
        setLoading(false);
      } catch (err: any) {
        if (err.response.status === 500) {
          router.replace("/contacts");
        }
        console.log(err);
      }
    };
    if (id) {
      fetchContacts();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/contacts/${id}`);
      router.push("/contacts");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <Header />
      <ColorsComponent />
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
      {!loading && contact.id && (
        <>
          {" "}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {`${contact.first_name}'s contact`}
              </h2>
            </div>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div className="bg-gray-100 h-40 w-full"></div>

              <div className="p-6">
                <div className="text-xl font-semibold">
                  {contact.first_name} {contact.last_name}
                </div>
                <div className="text-gray-500">{contact.phone_number}</div>
              </div>

              <div className="flex justify-between p-6">
                <Link
                  href={`/contacts/${id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </section>
  );
};

export default withAuthentication(ContactDetails);
