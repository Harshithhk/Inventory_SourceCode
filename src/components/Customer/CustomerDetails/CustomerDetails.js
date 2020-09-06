import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import styles from "./CustomerDetails.module.css";

const CustomerDetails = ({ customers, setCustomers }) => {
  const [searchText, setSearchText] = useState("");
  const [filterid, setFilterId] = useState();
  //   ________HANDLING SEARCH___________
  const Filteredposts = customers.filter((post) => {
    return post.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleid = (e) => {
    console.log(e.target.value);
  };

  // __________________________________________
  const renderPosts = (item, index) => {
    if (item.outstanding_amount == 0) {
      var oa = "---";
    } else {
      var oa = `₹${item.outstanding_amount}`;
    }
    return (
      <tr key={item.id}>
        <td className={styles.datefeild}>{item.name}</td>
        <td>{item.phone_no}</td>

        <td>₹{item.amount_paid}</td>
        <td>{oa}</td>
        <td>
          <button value={item.id} onClick={handleid}>
            &#10562;
          </button>
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

      <div className={styles.sort}>
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
        <tbody>{Filteredposts.map(renderPosts)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default CustomerDetails;
