import React, { useState } from "react";
import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";
import ItemEdit from "./components/ItemEdit/ItemEdit";
import ToolBar from "./components/ToolBar/ToolBar";
import AddItem from "./components/AddItem/AddItem";
import Orders from "./components/Orders/Orders";
import CategoryEdits from "./components/AddItem/CategoryEdits/CategoryEdits";
import Customer from "./components/Customer/Customer";
import { PostProvider } from "./components/PostContext";
import { ListProvider } from "./components/ListContext";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  const [Search, setSearch] = useState("");

  // _________ADDING?EDITING________
  const [Cate, setCate] = useState([]);
  const [ForRefresh, setForRefresh] = useState("");

  // _________________TOGGLERS_____________
  const [ItemOverlay, setItemOverlay] = useState(false);
  const [Addtoggle, setAddtoggle] = useState(false);
  const [CategoryToggle, setCategoryToggle] = useState(false);
  const [refresh, setRefresh] = useState(true);

  return (
    <Router>
      <PostProvider>
        <div className="App">
          <Navbar />
          <Route exact path="/">
            <ToolBar
              Addtoggle={Addtoggle}
              setAddtoggle={setAddtoggle}
              setSearch={setSearch}
              Search={Search}
            />
            {Addtoggle && (
              <div>
                <AddItem
                  AddToggle={Addtoggle}
                  setAddToggle={setAddtoggle}
                  CategoryToggle={CategoryToggle}
                  setCategoryToggle={setCategoryToggle}
                  Cate={Cate}
                  setCate={setCate}
                  ForRefresh={ForRefresh}
                  setForRefresh={setForRefresh}
                />
              </div>
            )}

            <ListProvider>
              <div className="lolwrapper">
                <List
                  setItemOverlay={setItemOverlay}
                  ItemOverlay={ItemOverlay}
                  Search={Search}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />

                {ItemOverlay && (
                  <ItemEdit
                    // className="stickyitem"
                    ItemOverlay={ItemOverlay}
                    setItemOverlay={setItemOverlay}
                  />
                )}
              </div>
            </ListProvider>
          </Route>
          <Route exact path="/orders">
            <Orders refresh={refresh} setRefresh={setRefresh} />
          </Route>
          <Route path="/customers">
            <Customer />
          </Route>
        </div>
      </PostProvider>
    </Router>
  );
}

export default App;
