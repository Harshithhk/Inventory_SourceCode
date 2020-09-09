import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Bill.module.css";
import { PostContext } from "../../PostContext";
import { Form } from "react-bootstrap";
const Orders = ({
  idquant,
  setIdQuant,
  names,
  setNames,
  saleprice,
  setSalePrice,
  customer,
  total,
  setTotal,
  added,
  setAdded,
}) => {
  // const [posts, setPosts] = useContext(PostContext);
  const [copy, setCopy] = useState(saleprice);
  const [cust, setCust] = useState("");
  const [paid, setPaid] = useState(false);

  // _________DELETION_______

  // _________HANDLING QUANTITY___________
  var Copyiq = idquant;

  const handleMultiplication = async (e, index) => {
    var diff;

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
    var amountPaid = cust[0].amount_paid;
    var outstandingAmount = cust[0].outstanding_amount;
    if (paid) {
      amountPaid = Number(cust[0].amount_paid) + Number(total);
    } else {
      outstandingAmount = Number(cust[0].outstanding_amount) + Number(total);
    }
    // _________UPDATING CUSTOMER_________
    axios
      .put(
        `http://piyushdongre16.pythonanywhere.com/customer/${cust[0].id}/?format=json`,
        {
          id: cust[0].id,
          name: cust[0].name,
          phone_no: cust[0].phone_no,
          daily_service: cust[0].daily_service,
          outstanding_amount: outstandingAmount,
          amount_paid: amountPaid,
        }
      )
      .then((res) => {
        console.log(`PUT CUSTOMER`);
      })
      .catch((err) => {
        console.log(err);
      });

    // __________POSTING ORDER___________
    axios
      .post("https://piyushdongre16.pythonanywhere.com/order/?format=json", {
        order_items: Copyiq,
        total_cost: `${total}`,
        paid: paid,
        daily_order: false,
        customer: cust[0].id,
      })
      .then((res) => {
        setAdded(added + 1);
        window.location.reload();
        console.log("POSTED SUCCESFULLY");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // _____________DELETION____________
  var salepricetemp = saleprice;
  useEffect(() => {
    salepricetemp = saleprice;
  }, [saleprice]);

  const handledelete = (e, name, id, sp, qu) => {
    salepricetemp = salepricetemp.splice(Number(e.target.value), 1);
    setTotal(total - Number(sp * qu));
    setIdQuant(
      idquant.filter((idq) => {
        return idq.product_id !== id;
      })
    );
    setNames(
      names.filter((nam) => {
        return nam !== name;
      })
    );
    Copyiq = Copyiq.filter((ciq) => {
      return ciq.product_id !== id;
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
              <li key={iq.product_id} className={styles.plus}>
                <div>{names[index]}</div>
                <div>
                  <input
                    type="number"
                    value={Copyiq[index].quantity}
                    className={styles.quantityno}
                    onChange={(e) => handleMultiplication(e, index)}
                  />
                  <span id={styles.price}>${salepricetemp[index]}</span>
                </div>
                <button
                  className={styles.delete_btn}
                  value={index}
                  onClick={(e) =>
                    handledelete(
                      e,
                      names[index],
                      iq.product_id,
                      saleprice[index],
                      Copyiq[index].quantity
                    )
                  }
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>

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
