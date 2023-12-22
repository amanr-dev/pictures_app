import { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { fetchUser } from "./utils/fetchUser";
import AnimatedCursor from "react-animated-cursor";
import { useMediaQuery } from "react-responsive";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();

    if (!user) {
      navigate("/login");
    }
  }, []);

  const responsive = useMediaQuery({
    query: "(max-width: 666px)",
  });

  // console.log(responsive);

  return (
    <>
      {!responsive && (
        <AnimatedCursor
          innerSize={12}
          outerSize={8}
          color="0, 122, 252"
          outerAlpha={0.8}
          innerScale={0.7}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
            "img",
          ]}
        />
      )}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
