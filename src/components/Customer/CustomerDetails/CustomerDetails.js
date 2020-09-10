import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import styles from "./CustomerDetails.module.css";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
const CustomerDetails = ({ customers, setCustomers }) => {
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Custname, setCustName] = useState("");
  const [PhoneNo, setPhoneNo] = useState(0);
  const [ID, setID] = useState(0);
  //   ________HANDLING SEARCH___________
  var Filteredposts = customers.filter((post) => {
    return post.name.toLowerCase().includes(searchText.toLowerCase());
  });
  var FilteredOutstanding = customers.filter((post) => {
    return (
      post.outstanding_amount > 0 &&
      post.name.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  // _______DELETING CUSTOMER___________
  const handleid = (e) => {
    axios
      .delete(
        `https://piyushdongre16.pythonanywhere.com/customer/${e.target.value}/?format=json`
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(e.target.value);
  };
  // __________UPDATING OUTSTANDING________
  var temp;
  const handlepaid = (e) => {
    temp = customers.filter((cust) => {
      return cust.id === Number(e.target.value);
    });
    console.log(temp);
    hanldePaidUpdate(e);
  };
  const hanldePaidUpdate = (e) => {
    temp[0].amount_paid = temp[0].amount_paid + temp[0].outstanding_amount;
    temp[0].outstanding_amount = 0;

    console.log(temp);
    axios
      .put(
        `https://piyushdongre16.pythonanywhere.com/customer/${e.target.value}/?format=json`,
        temp[0]
      )
      .then((res) => {
        console.log(`PAID SUCCESFUL`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //__________________SORTING_____________
  const handleSort = () => {
    setSort(!sort);
  };
  const payup = (item) => {
    if (sort) {
      return (
        <button
          value={item.id}
          className={styles.pay_Customer}
          onClick={handlepaid}
        >
          PAID
        </button>
      );
    }
  };
  // ______HANDLE EDIT__________
  const handleEditCust = (item) => {
    console.log(customers);
    console.log(item.id);
    setID(item.id);
    setEdit(!edit);
    setCustName(item.name);
    setPhoneNo(item.phone_no);
  };
  const handleCustUpdate = (item) => {
    console.log(Custname);
    console.log(item);
    console.log(`ID:${ID}`);
    axios
      .put(
        `https://piyushdongre16.pythonanywhere.com/customer/${ID}/?format=json`,
        {
          id: ID,
          name: Custname,
          phone_no: PhoneNo,
          daily_service: item.daily_service,
          outstanding_amount: item.outstanding_amount,
          amount_paid: item.amount_paid,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // __________________________________________
  const renderPosts = (item, index) => {
    if (item.outstanding_amount == 0) {
      var oa = "---";
    } else {
      var oa = `₹${item.outstanding_amount}`;
    }
    return (
      <tr key={item.id} className={styles.for_cursor}>
        <Modal show={edit} onHide={() => setEdit(!edit)} centered keyboard>
          <Modal.Header closeButton>
            <Modal.Title>{item.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="text">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder={item.name}
                    size="lg"
                    value={Custname}
                    onChange={(e) => setCustName(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="text">
                <Form.Label column sm="2">
                  Phone
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    placeholder={item.phone_no}
                    size="lg"
                    value={PhoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEdit(!edit)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleCustUpdate(item)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <td>{item.name}</td>
        <td>{item.phone_no}</td>

        <td>₹{item.amount_paid}</td>
        <td>{oa}</td>
        <td>
          <button
            value={item.id}
            className={styles.delete_Customer}
            onClick={handleid}
          >
            X
          </button>
          <button
            value={item.id}
            className={styles.edit_Customer}
            onClick={() => handleEditCust(item)}
          >
            <AiOutlineEdit />
          </button>
          {payup(item)}
        </td>
      </tr>
    );
  };
  // __________________________________________

  return (
    <div className={styles.customerdetails}>
      <h1 className={styles.title}>Customers:</h1>
      <input
        type="text"
        placeholder="Search by name"
        className={styles.searching}
        value={searchText}
        onChange={handleSearch}
      />

      <div className={styles.sort} onClick={handleSort}>
        Sort by Outstandings
        {sort ? <span> &#x02191;</span> : <span>&#x2193;</span>}
      </div>

      <ReactBootStrap.Table hover>
        <thead id="thead">
          <tr>
            <th>Name</th>
            <th>Phone_no:</th>
            <th>Amount_paid</th>
            <th>Outstandings</th>
          </tr>
        </thead>
        {sort ? (
          <tbody>{FilteredOutstanding.map(renderPosts)}</tbody>
        ) : (
          <tbody>{Filteredposts.map(renderPosts)}</tbody>
        )}
      </ReactBootStrap.Table>
    </div>
  );
};

export default CustomerDetails;
