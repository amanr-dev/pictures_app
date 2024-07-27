import { useNavigate } from "react-router-dom";

import Pictures from "../assets/pictures.mp4";
import Logo from "../assets/pictures.png";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  // On Success
  const onSuccess = (res) => {
    const userRes = jwtDecode(res.credential);
    localStorage.setItem("user", JSON.stringify(userRes));

    const { name, picture, jti } = userRes;

    const doc = {
      _id: jti,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  // On Success
  const onFail = (res) => {
    console.log("Login Failed =>", res);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={Pictures}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="flex flex-col absolute justify-center items-center top-0 right-0 left-0 bottom-0 bg-[#0000003b]">
          <div className="p-5">
            <img
              src={Logo}
              alt="pictures"
              className="rounded-sm lg:w-[200px] max-lg:w-[180px]"
            />
          </div>
          <div className="shadow-2xl relative bottom-[4rem]">
            {/* Google login */}
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onFail}
              text="Login to google"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
