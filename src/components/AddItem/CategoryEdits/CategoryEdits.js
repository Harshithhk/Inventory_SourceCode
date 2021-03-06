import React, { useState, useEffect, useContext } from "react";
import styles from "./CategoryEdits.module.css";
import { RiAddBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Fade";
import Cookies from "js-cookie";
import {
  InputGroup,
  Form,
  Row,
  Col,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CategoryEdits = ({
  Cate,
  setCate,
  setForRefresh,
  CategoryToggle,
  setCategoryToggle,
}) => {
  const history = useHistory();
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
        `https://piyushdongre16.pythonanywhere.com/category/${DelteCat.id}/?format=json`,
        {
          headers: {
            Authorization: `JWT ${Cookies.get("Authorization")}`,
          },
        }
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
        UpdateCat,
        {
          headers: {
            Authorization: `JWT ${Cookies.get("Authorization")}`,
          },
        }
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
        NewCat,
        {
          headers: {
            Authorization: `JWT ${Cookies.get("Authorization")}`,
          },
        }
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
    <Fade left>
      <div className={styles.CategoryEdits}>
        <div
          className={styles.CloseBtn}
          onClick={() => setCategoryToggle(!CategoryToggle)}
        >
          <div>X</div> <h4>CATEGORY:</h4>
        </div>

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
              Deleting a category will also delete their respective list of
              items
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
              onChange={handleUpdateName}
            />
            <RiAddBoxFill
              className={styles.Updatebtn}
              onClick={hanelUpdateCatSubmit}
            />
          </Form.Group>
        </div>
      </div>
    </Fade>
  );
};

export default CategoryEdits;
