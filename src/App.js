import React, { useState, useEffect, useContext } from "react";
import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";
import ItemEdit from "./components/ItemEdit/ItemEdit";
import ToolBar from "./components/ToolBar/ToolBar";
import AddItem from "./components/AddItem/AddItem";
import Orders from "./components/Orders/Orders";
import Customer from "./components/Customer/Customer";
import Login from "./components/Login/Login";
import { PostProvider } from "./components/PostContext";
// import AuthContext from "./components/AuthContext";
import { ListProvider } from "./components/ListContext";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Cookies from "js-cookie";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";
import { AuthContext } from "./components/AuthContext";

function App() {
  const [Search, setSearch] = useState("");
  const [token, setToken] = useContext(AuthContext);
  // ____________________LOGIN_________________
  const [loggedin, setLoggedin] = useState(false);
  // _______________ADDING/EDITING__________
  const [Cate, setCate] = useState([]);
  const [ForRefresh, setForRefresh] = useState("");

  // _________________TOGGLERS_____________
  const [ItemOverlay, setItemOverlay] = useState(false);
  const [Addtoggle, setAddtoggle] = useState(false);
  const [CategoryToggle, setCategoryToggle] = useState(false);
  const [refresh, setRefresh] = useState(true);

  // ____________CHECKING IF LOGGED IN_________
  const readCookie = () => {
    const user = Cookies.get("Authorization");
    if (user) {
      setLoggedin(true);
      setToken(`JWT ${user}`);
    }
  };
  useEffect(() => {
    readCookie();
  });

  return (
    <Router>
      <PostProvider>
        <div className="App">
          <Route exact path="/">
            {!loggedin ? (
              <Login setLoggedin={setLoggedin} setToken={setToken} />
            ) : (
              // <Redirect to="/login" />
              <>
                <Navbar setLoggedin={setLoggedin} />
                <ToolBar
                  Addtoggle={Addtoggle}
                  setAddtoggle={setAddtoggle}
                  setSearch={setSearch}
                  Search={Search}
                />
                {Addtoggle && (
                  <div>
                    <Fade>
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
                    </Fade>
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
                        ItemOverlay={ItemOverlay}
                        setItemOverlay={setItemOverlay}
                      />
                    )}
                  </div>
                </ListProvider>
              </>
            )}
          </Route>
          <Route exact path="/orders">
            {!loggedin ? (
              <Login setLoggedin={setLoggedin} setToken={setToken} />
            ) : (
              <>
                <Navbar setLoggedin={setLoggedin} />
                <Orders refresh={refresh} setRefresh={setRefresh} />
              </>
            )}
          </Route>
          <Route path="/customers">
            {!loggedin ? (
              <Login setLoggedin={setLoggedin} setToken={setToken} />
            ) : (
              <>
                <Navbar setLoggedin={setLoggedin} />
                <Customer />
              </>
            )}
          </Route>
          <Route exact path="/login">
            <Login setLoggedin={setLoggedin} setToken={setToken} />
          </Route>
        </div>
      </PostProvider>
    </Router>
  );
}

export default App;
