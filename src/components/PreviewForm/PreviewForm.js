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
  } = useContext(ItemsContext);

  const navigate = useNavigate();
  const [name, setName] = useState("");

  const submitHandler = () => {
    if(name !== ""){
    setSubmittedForms((submittedForms) => [...submittedForms, [...boardList]]);
    
    fetch("http://localhost:8000/api/forms/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name:name,boardList:boardList}),
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
    }else{
      alert("Name cannot be empty")
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
