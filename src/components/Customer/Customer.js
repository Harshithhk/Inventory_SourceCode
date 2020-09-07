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
  const [refe, setRefe] = useState(0);
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
  }, []);
  return (
    <div className={styles.customerWrapper}>
      <CustomerDetails customers={customers} setCustomers={setCustomers} />
      <AddCustomers refe={refe} setRefe={setRefe} />
    </div>
  );
};

export default Customer;
