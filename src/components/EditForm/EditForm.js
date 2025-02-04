import React, { useState, useContext, useEffect } from "react";
import { ItemsContext } from "../../context/SelectedItemsContext";
import "./EditForm.css";

const EditForm = () => {
  const { boardList, editElId, setBoardList, setEditElId } =
    useContext(ItemsContext);
  const [indexVal, setIndexVal] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  useEffect(() => {
    const index = boardList.findIndex((el) => el.id === editElId);

    setIndexVal(index);
    setLabelVal(boardList[index]?.label);
    setPlaceholderIdVal(boardList[index]?.placeholder);
    setRequiredVal(boardList[index]?.required === "false" ? false : true);
  }, [boardList, editElId]);

  useEffect(() => {
    if (boardList[indexVal]?.options) {
      setOptionsArr(boardList[indexVal].options);
    }
  }, [indexVal]);

  const [labelVal, setLabelVal] = useState("");
  const [placeholderVal, setPlaceholderIdVal] = useState("");
  const [requiredVal, setRequiredVal] = useState(false);
  const [optionsArr, setOptionsArr] = useState([]);
  const [optVal, setOptVal] = useState("");
  const removeHandler = (id) => {
    const copiedArr = [...boardList];
    const remainingArr = copiedArr.filter((el) => el.id !== id);
    setBoardList(remainingArr);
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    let obj = {}
    if (boardList[indexVal].name == "button") {
      obj = {
        ...boardList[indexVal],
        placeholder: placeholderVal,
      };
    } 
    else if(boardList[indexVal].name == "select"){
      obj = {
        ...boardList[indexVal],
        label: labelVal,
        placeholder: placeholderVal,
        required: requiredVal,
        options:[...optionsArr]
      }; 
    }
    else {
      obj = {
        ...boardList[indexVal],
        label: labelVal,
        placeholder: placeholderVal,
        required: requiredVal,
      };
    }

    const copiedArr = [...boardList];
    copiedArr[indexVal] = obj;
    setBoardList(copiedArr);
    setBtnDisabled(false)
    resetVal();
  };

  const handleOptions = () => {
    const copiedArr = [...optionsArr];
    copiedArr.push({ opLabel: optVal, opValue: "" });
    setOptionsArr(copiedArr);
    setOptVal("");
  };

  const handleOptionsSubmit = () => {
    setOptVal("");
    setBtnDisabled(true);
  };

  const resetVal = () => {
    setEditElId("");
    setIndexVal("");
    setLabelVal("");
    setPlaceholderIdVal("");
    setOptVal("")
    setOptionsArr([])
    setBtnDisabled(false);
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
          {optionsArr.length > 0  && (
            <>
              <label htmlFor="id-placeholder">Add option</label>
              <input
                type="text"
                name="id-option"
                id="id-option"
                value={optVal}
                onChange={(e) => {
                  setOptVal(e.target.value);
                }}
              ></input>
              <div className="btns-options">
                <button
                  style={{
                    backgroundColor: btnDisabled ? "#f8cdbd" : "#ff6b35",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleOptions();
                  }}
                  disabled={btnDisabled}
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleOptionsSubmit();
                  }}
                >
                  done
                </button>
              </div>
            </>
          )}
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
          <button
            onClick={(e) => {
              e.preventDefault();
              removeHandler(boardList[indexVal]?.id);
              setBtnDisabled(false)
            }}
          >
            Remove
          </button>
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
