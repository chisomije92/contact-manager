import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center w-full mt-36">
      &copy; {new Date().getFullYear()} Hux Contact Manager
    </footer>
  );
};

export default Footer;
