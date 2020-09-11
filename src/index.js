import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AuthProvider } from "./components/AuthContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
