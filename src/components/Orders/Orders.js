import React, { useState, useEffect, useContext } from "react";
import styles from "./Orders.module.css";
import { PostContext } from "../PostContext";
import Bill from "./Bill/Bill";
import HistoryOfOrders from "./HistoryOfOrders/HistoryOfOrders";
import OrderItemList from "./OrderItemList/OrderItemList";
import axios from "axios";

const Orders = () => {
  const [posts, setPosts] = useContext(PostContext);
  const [added, setAdded] = useState(0);
  const [history, setHistory] = useState([]);
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
        console.log(`CUSTOMER`, res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // _________FETCHING ORDERHISTORY__

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
      <HistoryOfOrders
        history={history}
        setHistory={setHistory}
        posts={posts}
        added={added}
        customer={customer}
      />
      <Bill
        customer={customer}
        setCustomer={setCustomer}
        idquant={idquant}
        setIdQuant={setIdQuant}
        names={names}
        setNames={setNames}
        saleprice={saleprice}
        setSalePrice={setSalePrice}
        total={total}
        setTotal={setTotal}
        setAdded={setAdded}
        added={added}
      />
    </div>
  );
};

export default Orders;
