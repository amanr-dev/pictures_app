import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePins = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  // Upload Image
  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
          // console.log(document);
        })
        .catch((error) => {
          console.log("Image upload error", error);
        });
    } else {
      setWrongImageType(true);

      setTimeout(() => setWrongImageType(false), 2000);
    }
  };

  // Upload Post
  const savePin = () => {
    if (title && about && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination: destination ? destination : null,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user.jti,
        postedBy: {
          _type: "postedBy",
          _ref: user.jti,
        },
        category,
      };

      client.create(doc).then(() => {
        naviagte("/");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    } else {
      setFields(true);

      setTimeout(() => setFields(false), 2000);
    }
  };

  const naviagte = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 dark:bg-slate-900 dark:text-slate-50">
      {fields && (
        <p className=" bg-red-200 w-full  text-red-500 mb-5 text-xl transition-all duration-150 ease-in flex flex-row justify-center gap-2 items-center dark:text-slate-50 dark:bg-slate-800">
          <FiAlertTriangle />
          Please fill in all the fields
        </p>
      )}
      {wrongImageType && (
        <p className=" bg-blue-200 w-full  text-blue-500 mb-5 text-xl transition-all duration-150 ease-in flex flex-row justify-center gap-2 items-center dark:text-slate-50">
          <FiAlertTriangle style={{ fontSize: "2rem" }} />
          This image type is not supported🥲.
          <br />
          Use hight-quality JPG, SVG, PNG, GIF OR TIFF less than 20 MB
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center dark:bg-slate-900 bg-white lg:p-5 p-3 lg:w-4/5 w-full ">
        <div className="bg-secondaryColor dark:bg-slate-800 p-3 flex flex-0.7 w-full">
          <div className="justify-center flex items-center flex-col border-2 border-gray-300 p-3 w-full h-420 dark:text-slate-50 dark:bg-slate-800">
            {loading && <Spinner />}
            {wrongImageType && (
              <p className="dark:text-slate-50">Wrong image type</p>
            )}
            {!imageAsset ? (
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg dark:text-slate-50">
                      Click to upload
                    </p>
                  </div>
                  <p className="mt-32 text-gray-400 dark:text-slate-50">
                    Use hight-quality JPG, SVG, PNG, GIF OR TIFF less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0 "
                />
              </label>
            ) : (
              <div className="relative h-full ">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full text-red-500 bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full ">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Set your title"
            className="outline-none text-xl sm:text-2xl  border-b-2 border-gray-200 p-2 text-slate-700  dark:bg-slate-900 dark:text-slate-50"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg dark:text-slate-50 dark:bg-slate-900">
              <img
                src={user.picture}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold text-slate-700  dark:text-slate-50">
                {user.name}
              </p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your Post about"
            className="outline-none text-slate-700 sm:text-2xl text-xl border-b-2  dark:bg-slate-900 border-gray-200 p-2 dark:text-slate-50 "
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="(Optional) Add destination link"
            className="outline-none  sm:text-2xl text-xl border-b-2  dark:bg-slate-900 border-gray-200 p-2"
          />
          <div className="flex flex-col  dark:bg-slate-900 dark:text-slate-50">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl text-slate-700 dark:text-slate-50 ">
                Choose post category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer text-slate-500  dark:bg-slate-900 dark:text-slate-50"
              >
                <option
                  value="other"
                  className="bg-white dark:text-slate-50 dark:bg-slate-800"
                >
                  Select category
                </option>

                {categories.map((item) => (
                  <option
                    value={item.name}
                    key={item.name}
                    className="text-base border-0 outline-none capitalize text-salte-500 "
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-blue-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePins;
