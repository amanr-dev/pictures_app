import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, User, Pins } from "./";
import Logo from "../assets/pictures.png";
import { client } from "../client";
import { userQuery } from "../utils/data";
// import jwtDecode from "jwt-decode";
import { fetchUser } from "../utils/fetchUser";
import Saved from "./Saved";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [theUser, setTheUser] = useState(null);
  const scrollRef = useRef(null);

  const user = fetchUser();

  useEffect(() => {
    const query = userQuery(user?.jti);

    client.fetch(query).then((data) => {
      setTheUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out ">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="px-4 w-full flex-row justify-between flex items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggle(true)}
          />
          <Link to="/">
            <img src={Logo} alt="Pictures" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?.jti}`}>
            <img
              src={user?.picture}
              alt="Pictures"
              className="w-14 rounded-full"
            />
          </Link>
        </div>
        {toggle && (
          <div className="fixed  w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="text-slate-700 cursor-pointer text-4xl"
                onClick={() => setToggle(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggle} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll " ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<User />} />
          <Route path="/*" element={<Pins user={user && user} />} />
          <Route path="/saved" element={<Saved user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
