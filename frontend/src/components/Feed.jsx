import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
      window.document.title = `Pictures | ${
        categoryId.slice(0, 1).toUpperCase() + categoryId.slice(1)
      }`;
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
      window.document.title = "Pictures";
    }
  }, [categoryId]);

  if (!pins?.length) {
    return (
      <div className="w-full h-[85vh] flex justify-center items-center  flex-col ">
        <Spinner text="Loading..." />
      </div>
    );
  }

  if (loading)
    return <Spinner text="Please wait while we fetching the Posts..." />;

  return <>{pins && <MasonryLayout pins={pins} />}</>;
};

export default Feed;
