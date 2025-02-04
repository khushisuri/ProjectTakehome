import React, { useContext, useState } from "react";
import { ItemsContext } from "../../context/SelectedItemsContext";
import Form from "../Form/Form";
import "./PreviewForm.css";
import { useNavigate } from "react-router";

const PreviewForm = () => {
  const {
    boardList,
    showPreview,
    setSubmittedForms,
    setBoardList,
    setShowPreview,
    formName,
    setFormName,
    updateFormID,
    setUpdateFormID,
  } = useContext(ItemsContext);

  const navigate = useNavigate();
  const submitHandler = () => {

    if (!updateFormID) {
      if (formName !== "") {
        setSubmittedForms((submittedForms) => [
          ...submittedForms,
          [...boardList],
        ]);

        fetch("http://localhost:8000/api/forms/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formName, boardList: boardList }),
        })
          .then((data) => data.json())
          .then((val) => {
            console.log("success");
          })
          .catch((err) => {
            console.log(err);
          });
        setBoardList([]);
        setShowPreview(false);
        navigate("/forms");
      } else {
        alert("Name cannot be empty");
      }

      console.log("post");
    } else {

    console.log(updateFormID);
    const url = `http://localhost:8000/api/forms/update/${updateFormID}`
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, boardList: boardList }),
      })
        .then((data) => data.json())
        .then((val) => {
          console.log("success");
        }) 
      setBoardList([]);
      setShowPreview(false);
      navigate("/forms");
      setUpdateFormID("");
      console.log("update");
    }
  };

  return (
    <>
      <div
        className="preview-form"
        style={{ display: showPreview ? "flex" : "none" }}
      >
        <div className="form-name">
          <label htmlFor="form_name">Enter Form Name</label>
          <input
            type="text"
            id="form_name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          ></input>
        </div>
        <div>
          {boardList.map(({ id, name, placeholder, label, options = "" }) => (
            <Form
              id={id}
              name={name}
              label={label}
              placeholder={placeholder}
              options={options}
              key={id}
            ></Form>
          ))}
        </div>
        <button id="submit" onClick={submitHandler}>
          Submit
        </button>
      </div>
      <div
        className="backdrop"
        style={{ display: showPreview ? "flex" : "none" }}
        onClick={() => setShowPreview(false)}
      ></div>
    </>
  );
};

export default PreviewForm;
