// components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-end p-4 text-black">
      <button className="px-4 py-2 mr-4 bg-gray-300 rounded-md">
        <Link to="/">Home</Link>
      </button>
      <button className="px-4 py-2 bg-gray-300 rounded-md">
        <Link to="/transaction-history">Transaction History</Link>
      </button>
    </nav>
  );
}

export default Navbar;
