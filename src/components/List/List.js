import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import { PostContext } from "../PostContext";
import { ListContext } from "../ListContext";
import { AuthContext } from "../AuthContext";

import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import styles from "./List.module.css";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

const List = (props) => {
  const history = useHistory();
  const [posts, setPosts] = useContext(PostContext);
  const [Uid, setUid, OverlayDetails, setOverlayDetails] = useContext(
    ListContext
  );
  const [token, setToken] = useContext(AuthContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const [posts, setPosts] = useState([]);
  const [Deleted, setDeleted] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    // readCookie();
    axios
      .get("https://piyushdongre16.pythonanywhere.com/products/?format=json", {
        headers: {
          Authorization: `JWT ${Cookies.get("Authorization")}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
        setDeleted(false);
        setOverlayDetails(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        history.push("/login");
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

  // ________DELETION_________
  const [delId, setdelId] = useState(0);
  const settingDelId = (e, id) => {
    setdelId(id);
    setDeleteModal(!deleteModal);
  };
  const handleDelete = () => {
    axios
      .delete(
        `https://piyushdongre16.pythonanywhere.com/products/${delId}/?format=json`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log(`DELETED SUCCESFULLY with response ${res}`);
        setDeleteModal(false);
        setDeleted(true);

        // window.location.reload();
      })
      .catch((err) => {
        // history.push("/login");
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
        <Modal
          show={deleteModal}
          onHide={() => setDeleteModal(!deleteModal)}
          centered
          keyboard
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal(!deleteModal)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <td className={styles.edit}>
          {ind}

          <div className={styles.deletebtn}>
            <button value={item.id} onClick={(e) => settingDelId(e, item.id)}>
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
    <LoadingOverlay active={isLoading} spinner={<BounceLoader />}>
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
        <Modal
          show={deleteModal}
          onHide={() => setDeleteModal(!deleteModal)}
          centered
          keyboard
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal(!deleteModal)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </LoadingOverlay>
  );
};

export default List;
