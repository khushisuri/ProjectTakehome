import React, { useContext } from "react";
import { ItemsContext } from "../../context/SelectedItemsContext";
import Form from "../Form/Form";
import "./PreviewForm.css";
import { useNavigate } from "react-router";

const PreviewForm = () => {
  const {
    boardList,
    showPreview,
    setSubmittedForms,
    submittedForms,
    setShowPreview,
  } = useContext(ItemsContext);

  const navigate = useNavigate()

  const submitHandler = () => {
    setSubmittedForms((submittedForms) => [...submittedForms, [...boardList]]);
    setShowPreview(false)
    navigate("/forms")
  };


  return (
    <>
      <div
        className="preview-form"
        style={{ display: showPreview ? "flex" : "none" }}
      >
        <div>
          {boardList.map(({ id, name, placeholder, label }) => (
            <Form
              id={id}
              name={name}
              label={label}
              placeholder={placeholder}
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
