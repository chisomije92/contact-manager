import React from "react";

const Footer = () => {
  return (
    <footer
      className="
      bg-gray-300 p-4 absolute bottom-0 w-full
      "
    >
      &copy; {new Date().getFullYear()} Hux Contact Manager
    </footer>
  );
};

export default Footer;
