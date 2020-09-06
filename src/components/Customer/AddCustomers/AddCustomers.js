import React, { useState } from "react";
import styles from "./AddCustomers.module.css";
import axios from "axios";
import {
  InputGroup,
  Form,
  Row,
  Col,
  FormControl,
  Button,
} from "react-bootstrap";
const AddCustomers = (r) => {
  const [custdata, setCustData] = useState({
    name: "",
    phone_no: "",
    daily_service: false,
    outstanding_amount: 0,
    amount_paid: 0,
  });
  const handlesubmit = () => {
    axios
      .post(
        "https://piyushdongre16.pythonanywhere.com/customer/?format=json",
        custdata
      )
      .then((res) => {
        console.log(res);
      });
    console.log(custdata);
  };
  return (
    <div className={styles.AddCustomers}>
      <h1>Add New Customer:</h1>
      <div className={styles.input}>
        <h3>Name:</h3>
        <Form.Control
          type="text"
          placeholder="Name"
          value={custdata.name}
          onChange={(e) => setCustData({ ...custdata, name: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <h3>Phone_No:</h3>
        <Form.Control
          type="number"
          placeholder="Phone_no"
          value={custdata.phone_no}
          onChange={(e) =>
            setCustData({ ...custdata, phone_no: e.target.value })
          }
        />
      </div>
      <div className={styles.check}>
        <h3>Daily_Service</h3>
        <input
          type="checkbox"
          placeholder="Phone_no"
          value={custdata.daily_service}
          onChange={(e) =>
            setCustData({ ...custdata, daily_service: !custdata.daily_service })
          }
        />
      </div>

      <div className={styles.buttonsubmit} onClick={handlesubmit}>
        SUBMIT
      </div>
    </div>
  );
};

export default AddCustomers;
