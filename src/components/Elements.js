import React, { useContext } from "react";
import Item from "./Item";
import "./Element.css";
import { ItemsContext } from "../context/SelectedItemsContext";

const Elements = () => {
  const items = useContext(ItemsContext); 

  return (
    <div className="el-list">
      <h2>drag elements</h2>
      {items.elList.map((el) => (
        <Item key={el.id} el={el} />
      ))}
    </div>
  );
};

export default Elements;
