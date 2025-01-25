import React, { useState, useContext, useEffect } from "react";
import { ItemsContext } from "../../context/SelectedItemsContext";
import "./EditForm.css";

const EditForm = () => {
  const { boardList, editElId, setBoardList, setEditElId } =
    useContext(ItemsContext);
  const [indexVal, setIndexVal] = useState("");

  useEffect(() => {
    const index = boardList.findIndex((el) => el.id === editElId);

    setIndexVal(index);
    setLabelVal(boardList[index]?.label);
    setPlaceholderIdVal(boardList[index]?.placeholder);
    setRequiredVal(boardList[index]?.required === "false" ? false : true);
  }, [boardList, editElId]);

  const [labelVal, setLabelVal] = useState("");
  const [placeholderVal, setPlaceholderIdVal] = useState("");
  const [requiredVal, setRequiredVal] = useState(false);

   useEffect(()=>{
    console.log(boardList);
  })
  const editSubmitHandler = (e) => {
    e.preventDefault();
    const obj =
      boardList[indexVal].name !== "button"
        ? {
            ...boardList[indexVal],
            label: labelVal,
            placeholder: placeholderVal,
            required: requiredVal,
          }
        : {
            ...boardList[indexVal],
            placeholder: placeholderVal,
          };
    const copiedArr = [...boardList];
    copiedArr[indexVal] = obj;
    setBoardList(copiedArr);
    resetVal();
  };
  const resetVal = () => {
    setEditElId("");
    setIndexVal("");
    setLabelVal("");
    setPlaceholderIdVal("");
    setRequiredVal(false);
  };
  return (
    <>
      <div
        style={{
          display: indexVal !== -1 && indexVal !== "" ? "block" : "none",
        }}
        className="edit"
      >
        <h2>Edit {boardList[indexVal]?.name} element</h2>
        <form className="edit-form">
          {boardList[indexVal]?.name !== "button" && (
            <>
              <label htmlFor="id-label">Label Value</label>
              <input
                type="text"
                name="id-label"
                id="id-label"
                value={labelVal}
                onChange={(e) => setLabelVal(e.target.value)}
              ></input>
            </>
          )}
          <label htmlFor="id-placeholder">Placeholder Value</label>
          <input
            type="text"
            name="id-placeholder"
            id="id-placeholder"
            value={placeholderVal}
            onChange={(e) => setPlaceholderIdVal(e.target.value)}
          ></input>
          {boardList[indexVal]?.name !== "button" && (
            <>
              <label htmlFor="id-checkbox">Required Value</label>
              <input
                type="checkbox"
                name="id-required"
                id="id-required"
                value={requiredVal}
                onChange={(e) => setRequiredVal(!requiredVal)}
              ></input>
            </>
          )}
        </form>
        <button onClick={editSubmitHandler}>Submit</button>
      </div>
      <div
        className="backdrop"
        style={{
          display: indexVal !== -1 && indexVal !== "" ? "block" : "none",
        }}
        onClick={resetVal}
      ></div>
    </>
  );
};

export default EditForm;
