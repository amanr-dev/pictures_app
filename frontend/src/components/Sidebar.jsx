import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
// import { IoIosArrowForward } from "react-icons/io";
import Logo from "../assets/pictures.png";
import { categories } from "../utils/data";

// NavLink Styles
const notActiveStyle =
  "flex flex-center px-5 gap-2 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize  items-center";
const isActiveStyle =
  "flex flex-center px-5 gap-2 font-extrabold border-r-2 border-black   transition-all duration-200 ease-in-out items-center  capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="relative flex px-5 gap-2 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
          style={{ top: "-33px" }}
        >
          <img src={Logo} alt="Pictures" className="w-full" />
        </Link>
        <div
          className="relative  flex flex-col gap-[1.8rem] mt-8"
          style={{ top: "-70px" }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : notActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHome2Line fontSize="1.2rem" />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl font-semibold text-gray-500">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : notActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="categories-pic"
                className="w-8 h-8 object-cover rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user.jti}`}
          className="flex mb-3 gap-2 items-center bg-slate-50 rounded-lg shadow-lg mx-3 relative -top-[20px]"
          onClick={handleCloseSidebar}
        >
          <img
            src={user?.picture}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <p>{user.name}</p>
        </Link>
      )}
      <div className="flex items-center bg-slate-50 rounded-lg  p-2 shadow-lg mb-2 mx-3">
        <span className="text-slate-500 text-sm font-semibold">
          Built by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/amanr-dev"
            className="text-blue-500"
          >
            Aman Rawat
          </a>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
