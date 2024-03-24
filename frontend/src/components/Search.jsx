import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());

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
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner text="Searching posts..." />}
      {pins?.length !== 0 && (
        <>
          <div className="flex items-start justify-start p-2">
            <h4 className="text-xl text-slate-700 font-semibold dark:text-slate-50 ">
              Showing results for{" "}
              <span className="text-blue-500">{searchTerm}</span>
            </h4>
          </div>
          <MasonryLayout pins={pins} />
        </>
      )}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="w-full h-full flex justify-center items-center  flex-col gap-4 mt-[10vw]">
          <span className="text-2xl text-slate-500">No Posts Found!</span>
        </div>
      )}
    </div>
  );
};

export default Search;
