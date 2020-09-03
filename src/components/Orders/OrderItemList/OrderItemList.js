import React, { useEffect, useContext, useState } from "react";
import styles from "./OrderItemList.module.css";
import * as ReactBootStrap from "react-bootstrap";
import Orders from "../Bill/Bill";

const OrderItemList = ({
  posts,
  names,
  setNames,
  idquant,
  setIdQuant,
  saleprice,
  setSalePrice,
  total,
  setTotal,
}) => {
  // const [posts, setPosts] = useContext(PostContext);

  const [searchText, setSearchText] = useState("");

  // _____SETTING FILTERED POSTS_______
  const Filteredposts = posts.filter((post) => {
    return post.name.toLowerCase().includes(searchText.toLowerCase());
  });
  // ________ADDING TO ORDER STATE____________

  const handleorderitem = (item) => {
    if (idquant.some((e) => e.product === item.id)) {
      console.log("EXIST");
    } else {
      setNames([...names, item.name]);
      setSalePrice([...saleprice, item.selling_price]);
      setIdQuant([...idquant, { product: item.id, quantity: 1 }]);
      setTotal(total + item.selling_price);
    }
  };

  // ______SEARCH____________________
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const renderPosts = (item, index) => {
    var total = item.selling_price * item.quantity;
    var weight = item.weight;
    var weightspec = "kg";

    // ____________________________________________
    return (
      <tr key={item.id} onClick={() => handleorderitem(item)}>
        <td className={styles.datefeild}>{item.name}</td>
        <td>{item.size}</td>
        <td>
          {weight}
          {weightspec}
        </td>
        <td>₹{item.selling_price}</td>
        <td>
          <button>+</button>
        </td>
      </tr>
    );
  };

  return (
    <div className={styles.OrderItemList}>
      {/* {props.Search} */}
      <input
        type="text"
        placeholder="SEARCH"
        className={styles.searchinput}
        value={searchText}
        onChange={handleSearch}
      />
      <ReactBootStrap.Table hover>
        <thead id="thead">
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Weight</th>
            <th>SP</th>
          </tr>
        </thead>
        <tbody>{Filteredposts.map(renderPosts)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default OrderItemList;
