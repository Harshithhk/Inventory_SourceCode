import React, { useContext, useState, useEffect } from "react";
import CustomerDetails from "./CustomerDetails/CustomerDetails";
import AddCustomers from "./AddCustomers/AddCustomers";
import * as ReactBootStrap from "react-bootstrap";
import styles from "./Customer.module.css";
import { PostContext } from "../PostContext";
import axios from "axios";
const Customer = () => {
  const [post, setPosts] = useContext(PostContext);
  const [customers, setCustomers] = useState([]);
  var r = false;
  useEffect(() => {
    axios
      .get("https://piyushdongre16.pythonanywhere.com/customer/?format=json")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [r]);
  return (
    <div className={styles.customerWrapper}>
      <CustomerDetails customers={customers} setCustomers={setCustomers} />
      <AddCustomers r={r} />
    </div>
  );
};

export default Customer;
