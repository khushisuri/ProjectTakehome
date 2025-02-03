import React from "react";
import "./Item.css";
import { useDrag, useDrop } from "react-dnd";
import Form from "./Form/Form";
const Item = ({el}) => {
    const {id,label,name,placeholder,options=""} = el
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: {id } ,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="el-container">
      <Form id={id} name={name} label={label} placeholder={placeholder} options={options}/>
    </div>
  );
};

export default Item;
