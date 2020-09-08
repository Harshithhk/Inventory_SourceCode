import React, { useEffect, useState } from "react";
import hostyles from "./HistoryOfOrders.module.css";
import axios from "axios";
const HistoryOfOrders = ({ history, setHistory, posts }) => {
  useEffect(() => {
    axios
      .get("http://piyushdongre16.pythonanywhere.com/order/?format=json")
      .then((res) => {
        console.log(res.data);
        setHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={hostyles.howrapper}>
      <h1>HISTORY:</h1>
      {history.map((order) => {
        return (
          <div key={order.id} className={hostyles.ho}>
            <div className={hostyles.flexhistory}>
              <h5 className={hostyles.hotitle}>
                Harshith
                <span className={hostyles.spanid}>Order ID:{order.id}</span>
              </h5>
              <div className={hostyles.QnT}>
                <h5>Quantity</h5>
                <h5>₹{order.total_cost}</h5>
              </div>
            </div>

            {order.order_items.map((item) => {
              return (
                <div className={hostyles.orderdetai}>
                  <h5 className={hostyles.hotitle}>Item_Name</h5>
                  <div className={hostyles.QnT}>
                    <h5>{item.quantity}</h5>
                    <h5>₹{order.total_cost}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryOfOrders;
