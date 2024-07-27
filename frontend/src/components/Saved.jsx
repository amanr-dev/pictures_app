import React, { useEffect, useState } from "react";
import { userQuery, userSavedPinsQuery } from "../utils/data";
import { client } from "../client";
import { useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";

const Saved = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [savedPosts, setSavedPosts] = useState(null);

  useEffect(() => {
    if (!user) {
      const query = userQuery(userId);
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
    // console.log({ query, user });
  }, [userId, user]);

  // console.log(savedPosts);
  useEffect(() => {
    const savePinsQuery = userSavedPinsQuery(userId);
    // console.log(savePinsQuery);

    client.fetch(savePinsQuery).then((post) => {
      setSavedPosts(post);
    });
  }, [userId]);

  return (
    <div>
      <div className="w-full mt-8 ">
        <header className="w-full p-4 bg-slate-200 dark:bg-slate-900 ">
          <h4 className="text-gray-500 text-3xl font-semibold dark:text-slate-50">
            Saved Posts
          </h4>
        </header>
        {!savedPosts?.length ? (
          <div className="flex justify-center items-center text-xl text-slate-500 mt-[20%]">
            Saved Posts not found!
          </div>
        ) : (
          <div className="w-full mt-8 p-4">
            <MasonryLayout pins={savedPosts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
