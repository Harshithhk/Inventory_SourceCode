import React, { useContext, useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {props.children}
    </PostContext.Provider>
  );
};
