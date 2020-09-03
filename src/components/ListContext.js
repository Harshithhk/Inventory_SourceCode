import React, { useContext, useState } from "react";

export const ListContext = React.createContext();

export const ListProvider = (props) => {
  const [Uid, setUid] = useState();
  const [OverlayDetails, setOverlayDetails] = useState([]);

  return (
    <ListContext.Provider
      value={[Uid, setUid, OverlayDetails, setOverlayDetails]}
    >
      {props.children}
    </ListContext.Provider>
  );
};
