import React, { useState, useEffect, useContext } from "react";
import CategoryEdits from "./CategoryEdits/CategoryEdits";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";

// import { AuthContext } from "../AuthContext";
import { CSSTransitionGroup } from "react-transition-group"; // ES6
import {
  InputGroup,
  Form,
  Row,
  Col,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { MdLibraryAdd } from "react-icons/md";

import { PostContext } from "../PostContext";

import styles from "./AddItem.module.css";
import { useHistory } from "react-router-dom";

//_________IMPORT ENDS_______________________________

const AddItem = ({
  AddToggle,
  setAddToggle,
  Cate,
  setCate,
  ForRefresh,
  setForRefresh,
  CategoryToggle,
  setCategoryToggle,
}) => {
  const history = useHistory();
  const [posts, setPosts] = useContext(PostContext);
  // const [token, setToken] = useContext(AuthContext);
  // ________DUMMY DATA FOR FEILDS______________________
  var dummy = {
    name: "",
    manufacturer: "",
    distributer: "",
    size: "",
    quantity: 0,
    cost_price: 0,
    selling_price: 0,
    mfg_date: "",
    exp_date: "",
    category: "",
  };
  // ___________FOR ERROR PLACE HOLDERS______________
  const errordummy = {
    weight: "",
    quantity: "",
    costprice: "",
    sellingprice: "",
    expmonths: "",
    required: "",
    category: "",
    mfgdate: "",
    expdate: "",
  };
  const [errors, setErrors] = useState(errordummy);
  // _________________VALIDATION__________________

  const validation = () => {
    var regEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    if (Number(AddedData.weight) < 0) {
      setErrors({
        ...errors,
        weight: "Weight cannot be Negative",
      });
      return false;
    }
    if (Number(AddedData.quantity) < 0) {
      setErrors({
        ...errors,
        quantity: "Quantity cannot be Negative",
      });
      return false;
    }
    if (Number(AddedData.cost_price) < 0) {
      setErrors({
        ...errors,
        costprice: "Costprice cannot be Negative",
      });
      return false;
    }
    if (Number(AddedData.selling_price) < Number(AddedData.cost_price)) {
      setErrors({
        ...errors,
        sellingprice: "sellingprice cannot be less than CP",
      });
      return false;
    }
    if (AddedData.mfg_date === "") {
      setErrors({
        ...errors,
        required: "Feilds with star(*) cannot be empty",
      });
      return false;
    }
    // if (AddedData.mfg_date.match(regEx) == null) {
    //   setErrors({
    //     ...errors,
    //     mfgdate: "Format should be YYY-MM-DD",
    //   });
    //   return false;
    // }
    // if (AddedData.exp_date.match(regEx) == null) {
    //   setErrors({
    //     ...errors,
    //     expdate: "Format should be YYY-MM-DD",
    //   });
    //   return false;
    // }

    if (AddedData.category === "") {
      setErrors({
        ...errors,
        category: "Select a Category",
      });
      return false;
    } else {
      return true;
    }
  };

  // _____________________________________________

  const [ExpAddition, setExpAddition] = useState(false);
  // const [ForRefresh, setForRefresh] = useState("");

  // TO ADD MONTHS OF EXP

  /*ToBePassedToCategoryEdits*/
  const [AddedData, setAddedData] = useState(dummy);
  console.log("ADDEDARRAT");
  console.log(AddedData);

  // _____________SUBMITTING DATA__________________
  const handlesubmit = (e) => {
    console.log(AddedData);
    const isValid = validation();
    console.log(isValid);
    if (isValid) {
      axios
        .post(
          " https://piyushdongre16.pythonanywhere.com/products/?format=json",
          AddedData,
          {
            headers: {
              Authorization: `JWT ${Cookies.get("Authorization")}`,
            },
          }
        )
        .then((res) => {
          console.log("POSTED SUCCESFULLY");
          setMBX(0);
          setPosts([...posts, AddedData]);
          setAddedData(dummy);
          setErrors(errordummy);
        })
        .catch((err) => {
          setErrors({
            ...errors,
            required: "Feilds with star(*) cannot be empty",
          });
          // history.push("/login");

          console.log(err);
        });
    }
  };

  useEffect(() => {
    setCategoryToggle(false);
    axios
      .get(`https://piyushdongre16.pythonanywhere.com/category/`, {
        headers: {
          Authorization: `JWT ${Cookies.get("Authorization")}`,
        },
      })
      .then((res) => {
        setCate(res.data);
        console.log("FETCHED");
      })
      .catch((err) => {
        console.log(err);
        console.log(`Failed DATA ${AddedData}`);
        // history.push("/login");
      });
  }, [ForRefresh]);
  // ___________________HANDLEING ADDING OF DATA______
  const [MBX, setMBX] = useState(0);

  const handleaddexpno = (e) => {
    setMBX(e.target.value);
    setAddedData({
      ...AddedData,
      exp_date: `${moment(AddedData.mfg_date)
        .add(e.target.value, "months")
        .format("YYYY-MM-DD")}`,
    });
    // setMBX(
    //   moment(AddedData.mfg_date)
    //     .add(e.target.value, "months")
    //     .format("DD-MM-YYYY")
    // );
    // console.log(MBX);
  };
  const handleadd = (e) => {
    console.log(e.target.type);
    if (e.target.name == "mfg_date") {
      setMBX(0);
      console.log("CAUGHT");

      var a = `${moment(e.target.value).format("YYYY-MM-DD")}`;
      setAddedData({
        ...AddedData,
        [e.target.name]: a,
      });
      // b = moment(a).add(1, "months").format("YYYY-MM-DD");

      // console.log("EXP DATE", b);
      console.log("MOMENT", a);
    } else {
      setAddedData({
        ...AddedData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handcateeleadd = (e) => {
    console.log(`SELECTED CATEGORY ${e.target.value}`);
    setAddedData({
      ...AddedData,
      category: e.target.value,
    });
  };
  // ____________CANEL BUTTON______________________
  const handleHideAdd = () => {
    setAddToggle(!AddToggle);
  };

  // HANDLING CATEGORY TOGGLE
  const handleCategoryToggleB = () => {
    setCategoryToggle(!CategoryToggle);
  };

  // HANDLING RESET
  const handlereset = () => {
    setAddedData(dummy);
    setErrors(errordummy);
  };
  var index = 0;
  return (
    <div className={styles.addedit}>
      <div className={styles.addeditdetail}>
        <div className={styles.CloseBtn} onClick={handleHideAdd}>
          <div>X</div>
        </div>
        <div className={styles.btnreset} onClick={handlereset}>
          reset
        </div>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="text"
                  name="name"
                  value={AddedData.name}
                  onChange={handleadd}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Manufacturer*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="text"
                  name="manufacturer"
                  value={AddedData.manufacturer}
                  placeholder={AddedData.manufacturer}
                  onChange={handleadd}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Distributer*</Form.Label>
            <Form.Control
              className={styles.input}
              size="sm"
              type="text"
              name="distributer"
              value={AddedData.distributer}
              placeholder={AddedData.distributer}
              onChange={handleadd}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Size*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="text"
                  name="size"
                  value={AddedData.size}
                  placeholder={AddedData.size}
                  onChange={handleadd}
                />
              </Form.Group>
            </Col>
            {/* <Col>
              <Form.Group>
                <Form.Label>Weight(kgs)*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="number"
                  name="weight"
                  value={AddedData.weight}
                  placeholder={errors.weight}
                  onChange={handleadd}
                />
                <h3>{errors.weight}</h3>
              </Form.Group>
            </Col> */}
            <Col>
              <Form.Group>
                <Form.Label>Quantity*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="number"
                  name="quantity"
                  value={AddedData.quantity}
                  placeholder={AddedData.quantity}
                  onChange={handleadd}
                />
                <h3>{errors.quantity}</h3>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Cost price(₹)*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="number"
                  name="cost_price"
                  value={AddedData.cost_price}
                  placeholder={AddedData.cost_price}
                  onChange={handleadd}
                />
                <h3>{errors.costprice}</h3>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Selling price(₹)*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="number"
                  name="selling_price"
                  value={AddedData.selling_price}
                  placeholder={AddedData.selling_price}
                  onChange={handleadd}
                />
                <h3>{errors.sellingprice}</h3>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Mfg date*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="date"
                  name="mfg_date"
                  value={AddedData.mfg_date}
                  placeholder="dd-mm-yyy"
                  onChange={handleadd}
                />
                <h3>{errors.mfgdate}</h3>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Months before Exp*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="number"
                  name="exp_date"
                  value={MBX}
                  onChange={handleaddexpno}
                />
              </Form.Group>
            </Col>
            {/* <Col>
              <Form.Group>
                <Form.Label>Exp date*</Form.Label>
                <Form.Control
                  className={styles.input}
                  size="sm"
                  type="text"
                  name="exp_date"
                  value={MBX}
                  // placeholder="yyyy-mm-dd"
                  // onChange={handleadd}
                />
                <h3>{errors.expdate}</h3>
              </Form.Group>
            </Col> */}
          </Row>
          <Form.Group>
            <Form.Label>Category*</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              name="category"
              onChange={handcateeleadd}
            >
              <option>Select a category</option>
              {Cate.map((cat) => {
                index++;
                return <option key={index}>{cat.name}</option>;
              })}
            </Form.Control>
            <h3>{errors.category}</h3>
          </Form.Group>
          <h3>{errors.required}</h3>

          <div className={styles.buttonss}>
            <div className={styles.savecancel}>
              <Button
                variant="primary"
                onClick={handlesubmit}
                disabled={ExpAddition}
              >
                SAVE
              </Button>
              <Button variant="secondary" onClick={handleHideAdd}>
                Cancel
              </Button>
            </div>
            <Button
              variant="success"
              size="sm"
              className={styles.catbuttontoggle}
              onClick={handleCategoryToggleB}
            >
              <MdLibraryAdd />
              Add Category
            </Button>
          </div>
        </Form>
      </div>

      {CategoryToggle && (
        <CategoryEdits
          Cate={Cate}
          setCate={setCate}
          setForRefresh={setForRefresh}
          CategoryToggle={CategoryToggle}
          setCategoryToggle={setCategoryToggle}
        />
      )}
    </div>
  );
};

export default AddItem;
