import React, { useState, useEffect, useContext } from "react";
import { ListContext } from "../ListContext";
import axios from "axios";
import Popup from "reactjs-popup";
import styles from "./ItemEdit.module.css";
import Cookies from "js-cookie";
import {
  InputGroup,
  Form,
  Row,
  Col,
  FormControl,
  Button,
} from "react-bootstrap";

const ItemEdit = ({ setItemOverlay, ItemOverlay }) => {
  const [postData, setPostData] = useState([]);
  const [Cat, setCat] = useState([]);
  const [data, setdata] = useState([]);

  const [Uid, setUid, OverlayDetails, setOverlayDetails] = useContext(
    ListContext
  );

  // VALIDATION__________________________
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
    if (data.weight < 0) {
      setErrors({
        ...errors,
        weight: "Weight cannot be Negative",
      });
      return false;
    }
    if (data.quantity < 0) {
      setErrors({
        ...errors,
        quantity: "Quantity cannot be Negative",
      });
      return false;
    }
    if (data.cost_price < 0) {
      setErrors({
        ...errors,
        costprice: "Costprice cannot be Negative",
      });
      return false;
    }
    if (Number(data.selling_price) < Number(data.cost_price)) {
      setErrors({
        ...errors,
        sellingprice: "sellingprice cannot be less than CP",
      });
      return false;
    }
    if (data.mfg_date === "") {
      setErrors({
        ...errors,
        required: "Feilds with star(*) cannot be empty",
      });
      return false;
    }
    if (data.mfg_date.match(regEx) == null) {
      setErrors({
        ...errors,
        mfgdate: "Format should be YYY-MM-DD",
      });
      return false;
    }
    if (data.exp_date.match(regEx) == null) {
      setErrors({
        ...errors,
        expdate: "Format should be YYY-MM-DD",
      });
      return false;
    }

    if (data.category === "") {
      setErrors({
        ...errors,
        category: "Select a Category",
      });
      return false;
    } else {
      return true;
    }
  };
  // VALIDATION ENDSSSSSSSSSSSSSSSSSSSSSSSSS

  useEffect(() => {
    console.log(OverlayDetails);

    const respitem = OverlayDetails.filter((item) => item.id == Uid);
    var resp = respitem[0];
    setdata(resp);

    setPostData(respitem);
    axios
      .get(`https://piyushdongre16.pythonanywhere.com/category/`, {
        headers: {
          Authorization: `JWT ${Cookies.get("Authorization")}`,
        },
      })
      .then((res) => {
        setCat(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlesubmit = (e) => {
    const isValid = validation();
    console.log(isValid);
    if (isValid) {
      axios
        .put(
          `https://piyushdongre16.pythonanywhere.com/products/${data.id}/?format=json`,
          data,
          {
            headers: {
              Authorization: `JWT ${Cookies.get("Authorization")}`,
            },
          }
        )
        .then((res) => {
          console.log("POSTED SUCCESFULLY");
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
          setErrors({
            ...errors,
            required: "Feilds with star(*) cannot be empty",
          });
          alert("Feilds with Star(*) cannot be empty/Server Error");
        });
    }
  };
  // const [Value, setValue] = useState({});

  // console.log(Value);
  const handledata = async (e) => {
    console.log(e.target.value);
    await setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log("LOGGING CAT CHANGES");
    console.log(data);
  };

  const handleoverlaycancel = () => {
    setItemOverlay(!ItemOverlay);
  };

  // HANDLING RESET
  // const handlereset = () => {
  //   setdata(dummy);
  //   setErrors(errordummy);
  // };

  return (
    <div className={styles.itemedit}>
      {postData.map((post) => (
        <div className={styles.itemdetail} key={Uid}>
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
                    value={data.name}
                    placeholder={data.name}
                    onChange={handledata}
                  />
                  <h3>{errors.name}</h3>
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
                    value={data.manufacturer}
                    placeholder={data.manufacturer}
                    onChange={handledata}
                  />{" "}
                  <h3>{errors.manufacturer}</h3>
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
                value={data.distributer}
                placeholder={data.distributer}
                onChange={handledata}
              />{" "}
              <h3>{errors.distributer}</h3>
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
                    value={data.size}
                    placeholder={data.size}
                    onChange={handledata}
                  />{" "}
                  <h3>{errors.size}</h3>
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group>
                  <Form.Label>Weight*</Form.Label>
                  <Form.Control
                    className={styles.input}
                    size="sm"
                    type="number"
                    name="weight"
                    value={data.weight}
                    placeholder={data.weight}
                    onChange={handledata}
                  />{" "}
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
                    value={data.quantity}
                    placeholder={data.quantity}
                    onChange={handledata}
                  />{" "}
                  <h3>{errors.quantity}</h3>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Cost price*</Form.Label>
                  <Form.Control
                    className={styles.input}
                    size="sm"
                    type="number"
                    name="cost_price"
                    value={data.cost_price}
                    placeholder={data.cost_price}
                    onChange={handledata}
                  />{" "}
                  <h3>{errors.costprice}</h3>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Selling price*</Form.Label>
                  <Form.Control
                    className={styles.input}
                    size="sm"
                    type="number"
                    name="selling_price"
                    value={data.selling_price}
                    placeholder={data.selling_price}
                    onChange={handledata}
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
                    type="text"
                    name="mfg_date"
                    value={data.mfg_date}
                    placeholder={data.mfg_date}
                    onChange={handledata}
                  />{" "}
                  <h3>{errors.mfgdate}</h3>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Exp date*</Form.Label>
                  <Form.Control
                    className={styles.input}
                    size="sm"
                    type="text"
                    name="exp_date"
                    value={data.exp_date}
                    placeholder={data.exp_date}
                    onChange={handledata}
                  />{" "}
                  <h3>{errors.expdate}</h3>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Category* </Form.Label>
              <Form.Control
                size="sm"
                as="select"
                name="category"
                onChange={handledata}
              >
                <option>{data.category}</option>
                {Cat.map((cat) => {
                  return <option key={cat.name}>{cat.name}</option>;
                })}
              </Form.Control>{" "}
              <h3>{errors.category}</h3>
            </Form.Group>
            <div className={styles.buttonss}>
              <Button variant="primary" onClick={handlesubmit}>
                SAVE
              </Button>
              <Button variant="secondary" onClick={handleoverlaycancel}>
                Cancel
              </Button>
            </div>
          </Form>
          <h3>{errors.required}</h3>
        </div>
      ))}
    </div>
  );
};

export default ItemEdit;
