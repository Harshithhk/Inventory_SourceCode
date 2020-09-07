import React, { useContest, useState, useEffect, useContext } from "react";
import styles from "./Orders.module.css";
import { PostContext } from "../PostContext";
import Bill from "./Bill/Bill";
import OrderItemList from "./OrderItemList/OrderItemList";
import axios from "axios";

const Orders = () => {
  const [posts, setPosts] = useContext(PostContext);
  const [customer, setCustomer] = useState([]);
  //_________ TRANSFERABLE DATA_______________
  const [total, setTotal] = useState(0);
  const [names, setNames] = useState([]);
  const [idquant, setIdQuant] = useState([]);
  const [saleprice, setSalePrice] = useState([]);

  // _________FETCHING____________
  useEffect(() => {
    axios
      .get("https://piyushdongre16.pythonanywhere.com/products/?format=json")
      .then((res) => {
        setPosts(res.data);

        console.log("ORDERLIST FETCHED");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // _________FETCHING CUSTOMER____________
  useEffect(() => {
    axios
      .get("https://piyushdongre16.pythonanywhere.com/customer/?format=json")
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.OrderContainer}>
      <OrderItemList
        posts={posts}
        names={names}
        setNames={setNames}
        idquant={idquant}
        setIdQuant={setIdQuant}
        saleprice={saleprice}
        setSalePrice={setSalePrice}
        total={total}
        setTotal={setTotal}
      />

      <Bill
        customer={customer}
        idquant={idquant}
        setIdQuant={setIdQuant}
        names={names}
        setNames={setNames}
        saleprice={saleprice}
        setSalePrice={setSalePrice}
        customer={customer}
        total={total}
        setTotal={setTotal}
      />
    </div>
  );
};

export default Orders;
