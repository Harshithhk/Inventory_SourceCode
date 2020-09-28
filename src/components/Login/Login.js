import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../AuthContext";

import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { red } from "@material-ui/core/colors";

const Login = ({ setLoggedin }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    axios
      .post("https://piyushdongre16.pythonanywhere.com/token-auth/", {
        username: name,
        password: password,
      })
      .then((res) => {
        setIsLoading(false);

        Cookies.set("Authorization", `${res.data.token}`, { expires: 1 });
        if (res.data.token !== "") {
          setLoggedin(true);
          setToken(`JWT ${res.data.token}`);
          history.push("/");
        }
        console.log(`JWt ${res.data.token}`);
      })
      .catch((err) => {
        setErrorMsg(true);
        setIsLoading(false);

        console.log(err);
      });
  };
  return (
    <LoadingOverlay active={isLoading} spinner={<BounceLoader />}>
      <div className="joinOuterContainer">
        <div className="ripple-background">
          <div className="circle xxlarge shade1"></div>
          <div className="circle xlarge shade2"></div>
          <div className="circle large shade3"></div>
          <div className="circle mediun shade4"></div>
          <div className="circle small shade5"></div>
        </div>
        <div className="joinInnerContainer">
          <h1 className="heading">Login</h1>
          <div>
            <input
              placeholder="username"
              className="joinInput"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="password"
              className="joinInput mt-20"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMsg && (
            <h1 style={{ color: "red", fontSize: "10px", marginTop: "5px" }}>
              INVALID CREDENTIALS
            </h1>
          )}
          <button
            className={"button mt-20"}
            type="submit"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Login;
