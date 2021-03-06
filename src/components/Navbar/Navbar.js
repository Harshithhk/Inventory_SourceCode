import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
  },
}));

export default function ButtonAppBar({ setLoggedin }) {
  const classes = useStyles();
  const history = useHistory();

  // __________LOGGING OUT__________
  const handleLogOut = () => {
    Cookies.remove("Authorization");
    history.push("/login");

    setLoggedin(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h5" className={classes.title}>
            <a className="linked" href="/">
              INVENTORY
            </a>
          </Typography>
          <div className="NavPannel">
            <ul>
              <Link
                to="/orders"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li> ORDERS</li>
              </Link>
              <Link
                to="/customers"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li>CUSTOMERS</li>
              </Link>
              <li>ORDERS</li>
            </ul>
          </div>

          <Button className="Loginbtn" color="inherit" onClick={handleLogOut}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
