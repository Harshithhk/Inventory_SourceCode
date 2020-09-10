import React, { useEffect, useState, useContext } from "react";
import hostyles from "./HistoryOfOrders.module.css";
import axios from "axios";
import moment from "moment";
const HistoryOfOrders = ({ history, setHistory, posts, added, customer }) => {
  useEffect(() => {
    axios
      .get("https://piyushdongre16.pythonanywhere.com/order/?format=json")
      .then((res) => {
        console.log(res.data);
        setHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [added]);

  return (
    <div className={hostyles.howrapper}>
      <h1>HISTORY:</h1>
      {history.map((order) => {
        var date = moment(order.order_date).format("LLL");

        return (
          <div key={order.id} className={hostyles.ho}>
            <div className={hostyles.flexhistory}>
              {customer
                .filter((cust) => {
                  return cust.id === order.customer;
                })
                .map((filteredcustomer) => {
                  return (
                    <h5 className={hostyles.hotitle}>
                      {filteredcustomer.name}
                      <span className={hostyles.spanid}>
                        Order ID:{order.id}
                      </span>
                    </h5>
                  );
                })}

              <div className={hostyles.QnT}>
                <h5>Quantity</h5>
                <h5>₹{order.total_cost}</h5>
              </div>
            </div>

            {order.order_items.map((item) => {
              return (
                <div key={item.product_id} className={hostyles.orderdetai}>
                  {posts
                    .filter((post) => {
                      return post.id === item.product_id;
                    })
                    .map((filteredpost) => {
                      return (
                        <>
                          <h5 className={hostyles.hotitle}>
                            {filteredpost.name}
                          </h5>
                          <div className={hostyles.QnT1}>
                            <h5>{item.quantity}</h5>
                            <h5>
                              ₹{filteredpost.selling_price * item.quantity}
                            </h5>
                          </div>
                        </>
                      );
                    })}
                </div>
              );
            })}
            {/* <span className={hostyles.date}>{date}</span> */}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryOfOrders;
