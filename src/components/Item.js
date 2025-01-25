import React from "react";
import "./Item.css";
import { useDrag, useDrop } from "react-dnd";
import Form from "./Form/Form";
const Item = ({el}) => {
    const {id,label,name,placeholder} = el
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: {id } ,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="el-container">
      <Form id={id} name={name} label={label} placeholder={placeholder}/>
    </div>
  );
};

export default Item;
