import React, { useState, useEffect } from "react";
import { MdLibraryAdd } from "react-icons/md";
import "./ToolBar.css";
import { Button } from "react-bootstrap";

import { PostContext } from "../PostContext";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import BButton from "@material-ui/core/Button";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80%",
      border: "green",
    },
  },
}));

const ToolBar = ({
  Addtoggle,
  setAddtoggle,
  setFilteredPosts,
  setSearch,
  Search,
}) => {
  const classes = useStyles();
  // STATES

  // SEARCHING

  const handleSearchChange = (e) => {
    console.log(e.target.value);

    setSearch(e.target.value);
    var URL;
  };

  const handleAddToggle = (e) => {
    setAddtoggle(!Addtoggle);
  };
  return (
    <div className="ToolBar">
      <Button variant="primary" className="addbutton" onClick={handleAddToggle}>
        <MdLibraryAdd />
        Add Item
      </Button>
      <div className="searching">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Search by name"
            value={Search}
            onChange={handleSearchChange}
          >
            <BButton variant="contained">Default</BButton>
          </TextField>
        </form>
      </div>
    </div>
  );
};

export default ToolBar;
