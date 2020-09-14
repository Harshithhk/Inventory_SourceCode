import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../AuthContext";

const Login = ({ setLoggedin }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(AuthContext);

  const handleLogin = () => {
    axios
      .post("https://piyushdongre16.pythonanywhere.com/token-auth/", {
        username: name,
        password: password,
      })
      .then((res) => {
        Cookies.set("Authorization", `${res.data.token}`, { expires: 1 });
        if (res.data.token !== "") {
          setLoggedin(true);
          setToken(`JWT ${res.data.token}`);
          history.push("/");
        }
        console.log(`JWt ${res.data.token}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
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

        <Link to="/">
          {" "}
          <button
            className={"button mt-20"}
            type="submit"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
