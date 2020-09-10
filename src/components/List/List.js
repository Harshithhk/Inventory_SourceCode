import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";

import { PostContext } from "../PostContext";
import { ListContext } from "../ListContext";

import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import styles from "./List.module.css";

const List = (props) => {
  const [posts, setPosts] = useContext(PostContext);
  const [Uid, setUid, OverlayDetails, setOverlayDetails] = useContext(
    ListContext
  );

  console.log(props);
  // const [posts, setPosts] = useState([]);
  const [Deleted, setDeleted] = useState(false);
  useEffect(() => {
    axios
      .get("https://piyushdongre16.pythonanywhere.com/products/?format=json")
      .then((res) => {
        setPosts(res.data);
        setDeleted(false);
        setOverlayDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Deleted, props.refresh]);
  // CONTEXTIN
  const Filteredps = posts.filter((post) => {
    return post.name.toLowerCase().includes(props.Search.toLowerCase());
  });

  const handleEditClick = (value) => {
    console.log(value);
    props.setItemOverlay(!props.ItemOverlay);

    setUid(value);
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
    var weight = item.weight;
    var weightspec = "kg";
    if (weight < 1) {
      weight = weight * 1000;
      weightspec = "gms";
    }

    // ____________________________________________
    return (
      <tr key={item.id}>
        <td className={styles.edit}>
          {ind}

          <div className={styles.deletebtn}>
            <button value="Click Me" onClick={() => handleDelete(item.id)}>
              <MdDelete />
            </button>
          </div>
          <div>
            <div className={styles.replacinga}>
              <button value="Click Me" onClick={() => handleEditClick(item.id)}>
                <AiFillEdit />
              </button>
            </div>
          </div>
        </td>
        <td className={styles.datefeild}>{item.name}</td>
        <td>{item.category}</td>
        <td>{item.manufacturer}</td>
        <td className={styles.datefeild}>{item.mfg_date}</td>
        <td className={styles.datefeild}>{item.exp_date}</td>
        <td>{item.size}</td>
        <td>{item.quantity}</td>
        <td>₹{item.selling_price}</td>
        <td>₹{total}</td>
      </tr>
    );
  };

  return (
    <div className="List">
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

            <th>Quantity</th>
            <th>Sell Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>{Filteredps.map(renderPosts)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default List;
