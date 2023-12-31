import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaUpload } from "react-icons/fa6";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  // console.log(user.jti);
  // if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-slate-100  border-none outline-none focus-within:shadow-sm">
        <IoMdSearch className="ml-1" fontSize={21} />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          value={searchTerm}
          onFocus={() => navigate("/search")}
          onBlur={() => navigate("/")}
          className="p-2 w-full bg-slate-100 rounded-md outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?.jti}`} className="hidden md:block">
          <img
            src={user?.picture}
            alt="user-pic"
            className="w-12 h-10 rounded-full border-2 border-blue-500"
          />
        </Link>
        <Link
          to="create-pin"
          className="bg-slate-700
        text-white rounded-full w-10 h-10 md:w-12 md:h-10 jus justify-center flex items-center text-xl hover:scale-110"
        >
          <FaUpload />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
