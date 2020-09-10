import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("https://piyushdongre16.pythonanywhere.com/token-auth/", {
        username: name,
        password: password,
      })
      .then((res) => {
        Cookies.set("Authorization", `JWT ${res.data.token}`);
        console.log(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="joinOuterContainer">
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
