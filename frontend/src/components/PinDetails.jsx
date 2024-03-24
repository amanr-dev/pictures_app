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
  // console.log(pinDetails?.postedBy.userName);

  if (!pinDetails) {
    return <Spinner text="Loading Post..." />;
  }

  const { postedBy, image, destination, title, about } = pinDetails;
  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-slate-50 dark:bg-slate-900 dark:text-slate-50 text-slate-700 dark:border-slate-50 dark:border-2 dark:rounded-tl-none rounded-3xl"
        style={{ maxWidth: "1500px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial border-r-0 border-slate-200 border-2 dark:border-r-2 dark:border-slate-50  dark:text-slate-50">
          <img
            src={pinDetails?.image && urlFor(pinDetails.image).url()}
            alt="user-post"
            className="rounded-r-3xl rounded-b-lg "
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620 rounded-s-xl dark:border-none border-slate-200 border-2  border-l-0">
          <div className="flex items-center ">
            <div className="flex  items-center justify-between w-full text-sm">
              <a
                href={`${image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-50 w-9 h-9 rounded-full flex items-center justify-center text-slate-700
                  text-2xl opacity-75
                  hover:opacity-100 hover:shadow-md outline-none "
              >
                <MdDownloadForOffline />
              </a>
              <a href={destination} target="_blank" rel="noreferrer">
                Visit Post Destination
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-start items-start flex-wrap gap-2 flex-col border-b-2 border-slate-200">
              <div className="w-full flex items-start gap-2 flex-col  border-b-2 border-slate-200">
                <Link
                  to={`/user-profile/${postedBy?._id}`}
                  className="flex gap-2 items-center mt-5 bg-slate-50 p-2 dark:bg-slate-900  rounded-lg"
                >
                  <img
                    src={postedBy?.image}
                    alt="user-profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-slate-700 dark:text-slate-50">
                    {postedBy?.userName}
                  </span>
                </Link>
              </div>
              <h1 className="text-4xl font-bold break-words mt-3 ">{title}</h1>
              <p className="">{about}</p>
            </div>

            <div className="w-full flex items-start justify-between flex-col mt-4 max-h-[500px] min-h-[490px]">
              <div className="max-h-370 overflow-y-auto dark:bg-slate-900 bg-slate-200 w-full rounded-md p-4 mt-4">
                <h2 className=" text-2xl border-slate-700 ">Comments</h2>
                {!pinDetails?.comment?.length ? (
                  <div className="flex gap-2 mt-5 items-center  shadow-md p-2 rounded-lg bg-slate-200 dark:bg-slate-900">
                    <div className="flex flex-col w-full">
                      <div className="w-full flex items-center justify-center mx-auto">
                        <span className="text-center text-sm italic">
                          Comments are empty. Be the first to comment!
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  pinDetails?.comment?.map((c, idx) => (
                    <div
                      className="flex gap-2 mt-5 items-center  shadow-md p-2 rounded-lg dark:bg-slate-800 bg-slate-50"
                      key={idx}
                    >
                      <img
                        src={c.postedBy?.image}
                        alt="user-profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-slate-700 dark:text-slate-50">
                          {c.postedBy?.userName}
                        </p>
                        <p>{c.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-wrap mt-6 gap-3 w-full">
                <Link to={`/user-profile/${postedBy?._id}`}>
                  <img
                    src={user?.picture}
                    alt="user-profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </Link>
                <input
                  type="text"
                  className="flex-1 dark:bg-slate-800 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300 w-full"
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
      </div>
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4 dark:text-slate-50 text-slate-700">
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
