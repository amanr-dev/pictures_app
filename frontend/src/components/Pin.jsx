import React, { useState } from "react";
import { urlFor, client } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiFillHeart, AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUser";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";

const Pin = ({
  responsive,

  pin: { postedBy, image, _id, destination, save },
}) => {
  const navigate = useNavigate();
  const [postHovered, setPostHovered] = useState(true);

  const user = fetchUser();

  // prettier-ignore
  const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.jti))?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.jti,
            postedBy: {
              _type: "postedBy",
              _ref: user?.jti,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        className="relative
         cursor-zoom-in
          w-auto
           hover:shadow-xl 
           rounded-lg
            overflow-hidden
             transition-all
              duration-200
               ease-in-out  hover-div "
        onMouseEnter={() => setPostHovered(true)}
        // onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img
          src={urlFor(image).width(1500).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />

        {/* prettier-ignore */}
        {(postHovered || responsive) && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-20
          "
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-slate-700
                  text-xl opacity-75
                  hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-blue-500 opacity-70 hover:opacity-100 text-white font-bold p-2 text-2xl rounded-3xl flex-row flex items-center justify-center 
                  hover:shadow-md outline-none relative"
                >
                  <span className="absolute text-[12px] text-gray-500">
                    {save?.length}
                  </span>
                  <BiSolidBookmark />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-blue-500 opacity-70 hover:opacity-100 text-white font-bold p-2 text-lg rounded-3xl 
              hover:shadow-md outline-none"
                >
                  <BiBookmark />
                </button>
              )}
            </div>
            <div
              className="flex justify-between items-center gap-2 w-full
            "
            >
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-1 text-slate-700 font-semibold p-2 pl-2 pr-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 18
                    ? destination.slice(0, 15)
                    : destination}
                </a>
              )}
              {/* delete button */}
              {postedBy?._id === user?.jti && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 p-2 rounded-3xl 
            hover:shadow-md outline-none text-xl text-white"
                >
                  <AiTwotoneDelete />
                </button>
              )}
              {postedBy?._id === user?.jti || (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 p-2 rounded-3xl 
            hover:shadow-md outline-none text-xl text-white"
                >
                  <AiFillHeart />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 items-center mt-2 text-slate-700"
      >
        <img
          src={postedBy?.image}
          alt="user-profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
