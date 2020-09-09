import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import styles from "./CustomerDetails.module.css";
import axios from "axios";

const CustomerDetails = ({ customers, setCustomers }) => {
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState(false);
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
  // __________________________________________
  const renderPosts = (item, index) => {
    if (item.outstanding_amount == 0) {
      var oa = "---";
    } else {
      var oa = `₹${item.outstanding_amount}`;
    }
    return (
      <tr key={item.id} className={styles.for_cursor}>
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
        Sort by Outstandings<span>&#x2193;</span>
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
