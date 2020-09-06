import React, { useContest, useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Bill.module.css";
import { PostContext } from "../../PostContext";
import { Form } from "react-bootstrap";
const Orders = ({
  idquant,
  setIdQuant,
  names,
  saleprice,
  setSalePrice,
  customer,
  total,
  setTotal,
}) => {
  const [posts, setPosts] = useContext(PostContext);
  const [copy, setCopy] = useState(saleprice);
  const [cust, setCust] = useState("");
  const [paid, setPaid] = useState(false);

  // _________DELETION_______

  // _________HANDLING QUANTITY___________
  var Copyiq = idquant;
  var Copysp = copy;
  var totalcalc = total;
  const handleMultiplication = async (e, index) => {
    var diff;
    console.log(Copysp);
    console.log(e.target.value);
    if (e.target.value > 0) {
      if (Number(e.target.value) < Copyiq[index].quantity) {
        console.log("SMALLER");
        console.log(typeof Copyiq[index].quantity);
        diff = setTotal(
          total -
            (Copyiq[index].quantity - Number(e.target.value)) * saleprice[index]
        );
      }
      if (Number(e.target.value) > Copyiq[index].quantity) {
        console.log("LARGER");
        diff = setTotal(
          total +
            (Number(e.target.value) - Copyiq[index].quantity) * saleprice[index]
        );
      }
      Copyiq[index].quantity = Number(e.target.value);
    }
  };
  // ______CUSTOMER__________
  // var tempcust;

  const handleCustomer = (e) => {
    setCust(
      customer.filter((custom) => {
        return custom.name == e.target.value;
      })
    );
    // tempcust = Number(tempcust[0].id);
    // console.log(tempcust);

    console.log(e.target.value);
  };
  // ________SUBMITTING________
  const handleOrderSubmit = () => {
    console.log({
      order_items: Copyiq,
      total_cost: total,
      paid: paid,
      daily_order: false,
      customer: cust[0].id,
    });
    axios
      .post("https://piyushdongre16.pythonanywhere.com/order/?format=json", {
        order_items: Copyiq,
        total_cost: `${total}`,
        paid: paid,
        daily_order: false,
        customer: cust[0].id,
      })
      .then((res) => {
        console.log("POST");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.Orders}>
      <h2>ORDERS:</h2>

      <div className={styles.container}>
        <h4>Payable amount</h4>
        <h1 id={styles.balance}>₹{total}</h1>

        <h3>History</h3>
        <ul id={styles.list} className={styles.list}>
          {idquant.map((iq, index) => {
            return (
              <li className={styles.plus}>
                <div>{names[index]}</div>
                <div>
                  <input
                    type="number"
                    value={Copyiq[index].quantity}
                    className={styles.quantityno}
                    onChange={(e) => handleMultiplication(e, index)}
                  />
                  <span id={styles.price}>${saleprice[index]}</span>
                </div>
                <button className={styles.delete_btn}>X</button>
              </li>
            );
          })}
        </ul>

        {/* <h3>Add Selling Price Manually?</h3>
        <form id={styles.form}>
          <div class={styles.form_control}>
            <input
              type="number"
              id={styles.amount}
              placeholder="Enter amount..."
            />
          </div>
        </form> */}
        <Form.Label>Customer Name:</Form.Label>
        <Form.Control as="select" onChange={handleCustomer}>
          <option>Default select</option>;
          {customer.map((cust) => {
            return <option key={cust.id}>{cust.name}</option>;
          })}
        </Form.Control>
        <div className={styles.Checkbox}>
          <input type="checkbox" onChange={() => setPaid(!paid)} />
          <h5 className={styles.paid}>PAID</h5>
        </div>
        <button className={styles.btn} onClick={handleOrderSubmit}>
          Add transaction
        </button>
      </div>
    </div>
  );
};

export default Orders;
