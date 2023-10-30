import api from "@/helpers/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsAuthenticated(false);
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              src="/Contacts.svg"
              width={50}
              alt="Hux contact manager"
              height={50}
            />
          </Link>
        </div>

        {router.pathname === "/" && !isAuthenticated && (
          <div className="lg:flex lg:justify-end">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
        {router.pathname !== "/login" &&
          router.pathname !== "/register" &&
          isAuthenticated && (
            <div className="lg:flex lg:justify-end">
              <button
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleLogout}
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          )}
      </nav>
    </header>
  );
};

export default Header;
