import React, { useEffect, useState } from "react";
import { userQuery } from "../utils/data";
import { client } from "../client";
import { useParams } from "react-router-dom";

const Saved = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
    //     console.log(userId);
  }, [userId]);
  return <div>Saved Posts</div>;
};

export default Saved;
