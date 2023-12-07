import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
import { useMediaQuery } from "react-responsive";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  // const [isMobile, setIsMobile] = useState(null);

  const responsive = useMediaQuery({
    query: "(max-width: 666px)",
  });

  // Adding responsiveness
  // useEffect(() => {
  //   setIsMobile(responsive);
  // }, [responsive]);

  // console.log(pins);
  return (
    <Masonry className="flex animate-slide-fwd " breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <Pin
          responsive={responsive}
          // isMobile={isMobile}
          key={pin._id}
          pin={pin}
        />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
