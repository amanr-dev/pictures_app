import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
import { useMediaQuery } from "react-responsive";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

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

  // console.log(responsive);
  return (
    <>
      <Masonry
        className="flex animate-slide-fwd "
        breakpointCols={breakpointObj}
      >
        {pins?.map((pin) => (
          <Pin
            responsive={responsive}
            // isMobile={isMobile}
            key={pin._id}
            pin={pin}
          />
        ))}
      </Masonry>
      <div className="flex items-center justify-around dark:bg-slate-900 dark:text-slate-50  bg-slate-50 rounded-lg  px-4 py-2 shadow-lg  mx-auto mt-[20%] dark:outline-slate-50 dark:outline">
        <div className="flex items-center justify-center gap-4">
          <span className="text-xl ">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/amanr-dev"
            >
              <FaGithub className="text-slate-500  dark:text-slate-50" />
            </a>
          </span>
          <span className="text-xl ">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/amanrdev"
            >
              <FaXTwitter className="text-slate-500  dark:text-slate-50" />
            </a>
          </span>
        </div>
        <div className="p-2">
          <span className="text-slate-500 text-sm font-semibold  dark:text-slate-50">
            Built by <span className="text-blue-500">Aman Rawat</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-slate-500 text-sm font-semibold  dark:text-slate-50">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </>
  );
};

export default MasonryLayout;
