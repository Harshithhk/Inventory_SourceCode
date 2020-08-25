import React, { useState } from "react";
import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";
import ItemEdit from "./components/ItemEdit/ItemEdit";
import ToolBar from "./components/ToolBar/ToolBar";
import AddItem from "./components/AddItem/AddItem";

import "./App.css";

function App() {
  const [Uid, setUid] = useState();
  const [ItemOverlay, setItemOverlay] = useState(false);
  const [OverlayDetails, setOverlayDetails] = useState([]);
  const [posts, setPosts] = useState([]);
  const [Addtoggle, setAddtoggle] = useState(false);
  const [CategoryToggle, setCategoryToggle] = useState(false);
  const [AddItemToggle, setAddItemToggle] = useState(false);

  const [Search, setSearch] = useState("");
  const overlaydisp = (ItemOverlay) => {
    if (ItemOverlay) {
      return <ItemEdit />;
    }
  };
  return (
    <div className="App">
      <Navbar />

      <ToolBar
        setPosts={setPosts}
        Addtoggle={Addtoggle}
        setAddtoggle={setAddtoggle}
        CategoryToggle={CategoryToggle}
        setCategoryToggle={setCategoryToggle}
        AddItemToggle={AddItemToggle}
        setAddItemToggle={setAddItemToggle}
        setSearch={setSearch}
        Search={Search}
      />
      {Addtoggle ? (
        <AddItem
          AddToggle={Addtoggle}
          setAddToggle={setAddtoggle}
          posts={posts}
          setPosts={setPosts}
          CategoryToggle={CategoryToggle}
          setCategoryToggle={setCategoryToggle}
          AddItemToggle={AddItemToggle}
          setAddItemToggle={setAddItemToggle}
        />
      ) : (
        <div></div>
      )}
      <div className="lolwrapper">
        <List
          Uid={Uid}
          setUid={setUid}
          setItemOverlay={setItemOverlay}
          ItemOverlay={ItemOverlay}
          setOverlayDetails={setOverlayDetails}
          setPosts={setPosts}
          posts={posts}
          Search={Search}
        />

        {ItemOverlay && (
          <ItemEdit
            Uid={Uid}
            OverlayDetails={OverlayDetails}
            // className="stickyitem"
            ItemOverlay={ItemOverlay}
            setItemOverlay={setItemOverlay}
            posts={posts}
          />
        )}
      </div>
    </div>
  );
}

export default App;
