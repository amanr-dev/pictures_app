import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Pictures from "../assets/pictures.mp4";
import Logo from "../assets/pictures.png";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  // On Success
  const onSuccess = (res) => {
    localStorage.setItem("user", JSON.stringify(res.credential));

    const { name, picture, jti } = jwtDecode(res.credential);

    const doc = {
      _id: jti,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
    // console.log(doc);
  };

  // On Success
  const onFail = (res) => {
    console.log("Faild🥲", res);
  };

  // console.log(localStorage.getItem(JSON.parse("user")));
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
              width="130px"
              className="rounded-sm"
            />
          </div>
          <div className="shadow-2xl">
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
