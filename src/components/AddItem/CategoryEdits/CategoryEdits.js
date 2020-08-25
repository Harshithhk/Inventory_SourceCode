import React, { useState, useEffect } from "react";
import styles from "./CategoryEdits.module.css";
import { RiAddBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {
  InputGroup,
  Form,
  Row,
  Col,
  FormControl,
  Button,
} from "react-bootstrap";

const CategoryEdits = ({ Cate, setCate, setForRefresh }) => {
  const [UpdateCat, setUpdateCat] = useState({ id: "", name: "" });
  const [NewCat, setNewCat] = useState({ name: "" });
  const [DelteCat, setDeleteCat] = useState({});
  const [ConfirmDeleteCat, setConfirmDeleteCat] = useState(false);
  var CatId;
  var ref;
  // Handleing Delete

  const ConfirmDelete = () => {
    setConfirmDeleteCat(!ConfirmDeleteCat);
  };
  const handleCatDelete = () => {
    axios
      .delete(
        `https://piyushdongre16.pythonanywhere.com/category/${DelteCat.id}/?format=json`
      )
      .then((response) => {
        console.log("DELETED CATEGORY");
        setForRefresh(DelteCat.id);
        ConfirmDelete();
      })
      .catch((err) => {
        alert("FAILED TO DELETE CAT");
        console.log(err);
      });
  };

  const handleDeleteOption = (e) => {
    setDeleteCat({ id: e.target.value });
  };
  // Handleing Update

  const handleOption = (e) => {
    setUpdateCat({ ...UpdateCat, id: e.target.value });
  };

  const handleUpdateName = (e) => {
    setUpdateCat({ ...UpdateCat, name: e.target.value });
  };
  const hanelUpdateCatSubmit = () => {
    axios
      .put(
        `https://piyushdongre16.pythonanywhere.com/category/${UpdateCat.id}/?format=json`,
        UpdateCat
      )
      .then((res) => {
        console.log("UPDATEDCAT SUCCESFULLY");
        console.log(UpdateCat);
        setForRefresh(UpdateCat.name);
      })
      .catch((err) => {
        alert("Failed To Add Category(Server Error)");
        console.log(err);
      });
  };

  //     ________________NEW CATEGORY______________

  const handleNewCat = (e) => {
    setNewCat({ name: e.target.value });
  };
  const handleNewCatSubmit = (e) => {
    axios
      .post(
        "https://piyushdongre16.pythonanywhere.com/category/?format=json",
        NewCat
      )
      .then((response) => {
        console.log("NEW CATEGORY ADDED");
        setNewCat({ name: "" });
        setForRefresh(NewCat.name);
      })
      .catch((err) => {
        alert("Failed To Add Category(Server Error)");
        console.log(err);
      });
  };
  return (
    <div className={styles.CategoryEdits}>
      <h4>CATEGORY:</h4>
      <h6>Add new category</h6>
      <div className={styles.cateditbox}>
        <Form.Group className={styles.input}>
          <Form.Control
            className="input"
            size="sm"
            type="text"
            name="exp_date"
            value={NewCat.name}
            onChange={handleNewCat}
          />
          <RiAddBoxFill
            className={styles.Updatebtn}
            onClick={handleNewCatSubmit}
          />
        </Form.Group>
      </div>
      {/*________________ DELETE CATS_____________ */}
      <h6>Delete category</h6>
      <div className={styles.cateditbox}>
        <Form.Group className={styles.input}>
          <Form.Control size="sm" as="select" onChange={handleDeleteOption}>
            <option>Select a category</option>
            {Cate.map((cats) => {
              return <option key={cats.id}>{cats.name}</option>;
            })}
          </Form.Control>

          <MdDelete className={styles.Deletebtn} onClick={ConfirmDelete} />
        </Form.Group>
      </div>
      {ConfirmDeleteCat && (
        <div className={styles.DeleteWarning}>
          <h6>Confirm Delete?</h6>
          <h8>
            Deleting a category will also delete their respective list of items
          </h8>
          <div className="deletecancel">
            <Button variant="secondary" onClick={ConfirmDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleCatDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
      {/*________________ EDIT CATS_____________ */}
      <h6>Edit categories</h6>
      <div className={styles.cateditbox}>
        <Form.Group className={styles.input}>
          <Form.Control size="sm" as="select" onChange={handleOption}>
            <option>Select a category</option>
            {Cate.map((cats) => {
              return <option key={cats.id}>{cats.name}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <h7>To:</h7>
        <Form.Group className={styles.input}>
          <Form.Control
            className="input"
            size="sm"
            type="text"
            name="exp_date"
            value={UpdateCat.name}
            // placeholder={AddedData.exp_date}
            onChange={handleUpdateName}
          />
          <RiAddBoxFill
            className={styles.Updatebtn}
            onClick={hanelUpdateCatSubmit}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default CategoryEdits;
