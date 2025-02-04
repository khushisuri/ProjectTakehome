import React, { useContext } from "react";
import "./Board.css";
import { useDrop } from "react-dnd";
import { ItemsContext } from "../context/SelectedItemsContext";
import Form from "./Form/Form";

const Board = () => {
  const { addItemToBoard, boardList,setShowPreview } = useContext(ItemsContext);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "element",
    drop: (item) => addItemToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const previewHandler = () =>{ 
     setShowPreview(showPreview=>!showPreview)
  } 
  return (
    <div className="board">
      <div className="content" ref={drop}>
        {boardList.length > 0 ? <h1>Click on elements to edit properties</h1>:<h1>drag here</h1>}
        <div>
          {boardList.map(({ id, name, placeholder, label ,options= "" }) => (
            <Form
              id={id}
              name={name}
              label={label}
              placeholder={placeholder}
              allowEdit={true}
              options = {options}
            />
          ))}
        </div>
      </div>
      {boardList.length > 0 && (
        <div className="btns">
          <button id="preview" onClick={previewHandler}>Preview</button>
        </div>
      )}
    </div>
  );
};

export default Board;
