import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetails = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comment: [] })
        .insert("after", "comment[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user.jti,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        });
    }
  };
  // console.log(user);

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetails(data[0]);
        // console.log(data);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);
  // console.log(pinDetails);

  if (!pinDetails) {
    return <Spinner text="Loading Post..." />;
  }

  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white "
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetails?.image && urlFor(pinDetails.image).url()}
            alt="user-post"
            className="rounded-r-3xl rounded-b-lg "
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center ">
            <div className="flex  items-center justify-between">
              <a
                href={`${pinDetails.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-slate-700
                  text-2xl opacity-75
                  hover:opacity-100 hover:shadow-md outline-none "
              >
                <MdDownloadForOffline />
              </a>
              <a href={pinDetails.destination} target="_blank" rel="noreferrer">
                Visit Post Destination
              </a>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3 ">
              {pinDetails.title}
            </h1>
            <p className="mt-3">{pinDetails.about}</p>
            <Link
              to={`user-profile/${pinDetails.postedBy?._id}`}
              className="flex gap-2 items-center mt-5 bg-white rounded-lg"
            >
              <img
                src={pinDetails.postedBy?.image}
                alt="user-profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="font-semibold capitalize">
                {pinDetails.postedBy?.userName}
              </p>
            </Link>
            <h2 className="mt-5 text-2xl  border-b border-slate-700 ">
              Comments
            </h2>
            <div className="max-h-370 overflow-y-auto ">
              {pinDetails?.comment?.map((c, idx) => (
                <div
                  className="flex gap-2 mt-5 items-center shadow-slate-100 shadow-md p-2 rounded-lg"
                  key={idx}
                >
                  <img
                    src={c.postedBy?.image}
                    alt="user-profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{c.postedBy?.userName}</p>
                    <p>{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${pinDetails.postedBy?._id}`}>
                <img
                  src={pinDetails.postedBy?.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </Link>
              <input
                type="text"
                className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white rounded-full px-6 py-2 text-base font-semibold outline-none"
                onClick={addComment}
              >
                {addingComment ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4 text-slate-700">
          More posts like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetails;
