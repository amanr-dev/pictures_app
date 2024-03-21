import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,coding,universe";

const actvieBtnClass =
  "bg-blue-500 mr-4 text-white font-bold p-2 rounded-full w-20 outline-none";
const nonActiveBtnClass =
  "bg-slate-500 mr-4 text-slate-100 font-bold p-2 rounded-full w-20 outline-none";

const User = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  // Refactor the logout function, so it aslo delete the user from sanity database.
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center ">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner"
            />
            <img
              src={user.image}
              alt="User-pic"
              className="rounded-full w-40 h-40 -mt-20 shadow-xl shadow-slate-400 object-cover
            "
            />
            <h1 className="font-bold text-3xl text-center text-slate-700  mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 right-0 z-1 p-2 text-center mt-2">
              {userId === user._id && (
                <>
                  <span className="text-white font-semibold text-xl pr-2">
                    Logout
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className=" bg-white rounded-full cursor-pointer p-2 text-xl outline-none shadow-md text-center"
                  >
                    <AiOutlineLogout color="red" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="text-center mb-7 ">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? actvieBtnClass : nonActiveBtnClass
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? actvieBtnClass : nonActiveBtnClass
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center items-center text-xl text-slate-500 mt-4">
              No posts found, Please create posts!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
