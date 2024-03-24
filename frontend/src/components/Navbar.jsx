import React from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaUpload } from "react-icons/fa6";
import { BiSolidBookmark } from "react-icons/bi";
import { DarkModeToggle } from "./Toggle";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  return (
    <>
      <div className="flex gap-2 md:gap-5 w-full mt-2  px-[10px] dark:bg-slate-900 items-center">
        <div className="flex justify-start items-center w-full  rounded-md    border-none outline-none focus-within:shadow-sm ">
          <div className=" dark:bg-slate-900 rounded-md dark:outline-slate-50 flex justify-start items-center w-full px-2   border-none outline-none focus-within:shadow-sm bg-slate-200">
            <IoMdSearch
              className="ml-1 text-slate-500 dark:outline-slate-50"
              fontSize={21}
            />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              value={searchTerm}
              className="p-2 w-full bg-slate-200 outline-none dark:bg-slate-900 dark:text-slate-50"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/saved-posts/${user?.jti}`}
            className="bg-slate-700
        text-white rounded-full w-10 h-10 md:w-12 md:h-10 jus justify-center flex items-center text-xl hover:scale-110"
          >
            <BiSolidBookmark />
          </Link>
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
        <div>
          <DarkModeToggle />
        </div>
      </div>
    </>
  );
};

export default Navbar;
