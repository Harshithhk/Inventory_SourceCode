import React, { useContext, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {props.children}
    </AuthContext.Provider>
  );
};
