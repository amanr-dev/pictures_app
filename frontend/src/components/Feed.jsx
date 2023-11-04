import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";
import MasonryLayout from "./MasonryLayout";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (!pins?.length) {
    return (
      <div className="w-full h-full flex justify-center items-center  flex-col gap-4">
        <span className="text-2xl text-slate-500">
          No Posts Found, Go create posts.
        </span>
        <Link
          to={`/create-pin`}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg text-xl hover:bg-blue-700"
        >
          Create post
        </Link>
      </div>
    );
  }

  if (loading)
    return <Spinner text="Please wait while we fetching the Posts..." />;

  // console.log(pins);
  return <>{pins && <MasonryLayout pins={pins} />}</>;
};

export default Feed;
