import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";

import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "./List.css";
const List = (props) => {
  console.log(props);
  // const [posts, setPosts] = useState([]);
  const [Deleted, setDeleted] = useState(false);
  useEffect(() => {
    axios
      .get("https://piyushdongre16.pythonanywhere.com/products/?format=json")
      .then((res) => {
        props.setPosts(res.data);
        setDeleted(false);
        props.setOverlayDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Deleted]);

  const Filteredps = props.posts.filter((post) => {
    return post.name.toLowerCase().includes(props.Search.toLowerCase());
  });

  const handleEditClick = (value) => {
    console.log(value);
    props.setItemOverlay(!props.ItemOverlay);

    props.setUid(value);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://piyushdongre16.pythonanywhere.com/products/${id}/?format=json`
      )
      .then((res) => {
        console.log(`DELETED SUCCESFULLY with response ${res}`);
        setDeleted(true);

        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var ind = 0;
  const renderPosts = (item, index) => {
    ind++;
    var total = item.selling_price * item.quantity;

    return (
      <tr key={item.id}>
        <td className="edit">
          {ind}

          <div className="deletebtn">
            <button value="Click Me" onClick={() => handleDelete(item.id)}>
              <MdDelete />
            </button>
          </div>
          <div>
            <div className="replacinga">
              <button value="Click Me" onClick={() => handleEditClick(item.id)}>
                <AiFillEdit />
              </button>
            </div>
          </div>
        </td>
        <td className="datefeild">{item.name}</td>
        <td>{item.category}</td>
        <td>{item.manufacturer}</td>
        <td className="datefeild">{item.mfg_date}</td>
        <td className="datefeild">{item.exp_date}</td>
        <td>{item.size}</td>
        <td>{item.weight}Kg</td>
        <td>{item.quantity}</td>
        <td>₹{item.selling_price}</td>
        <td>₹{total}</td>
        {/* {item.id === props.Uid ? (
          <div>
            <h2>HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</h2>
          </div>
        ) : (
          <div></div>
        )} */}
      </tr>
    );
  };

  return (
    <div className="List">
      {props.Search}
      {/* HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}
      <ReactBootStrap.Table striped bordered hover>
        <thead id="thead">
          <tr>
            <th className="editingbtns">Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Mfg</th>
            <th>Mfg Date</th>
            <th>Exp Date</th>
            <th>Size</th>
            <th>Weight</th>
            <th>Quantity</th>
            <th>SellPrice</th>
            <th>TotalValue</th>
          </tr>
        </thead>
        <tbody>{Filteredps.map(renderPosts)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default List;
