import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, CreatePins, Feed, Search, PinDetails } from "./";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5 ">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      {searchTerm.length ? (
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      ) : (
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route
              path="/pin-detail/:pinId"
              element={<PinDetails user={user} />}
            />
            <Route path="/create-pin" element={<CreatePins user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Pins;
