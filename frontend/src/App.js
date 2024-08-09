import { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
