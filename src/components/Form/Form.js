import React, { useContext } from "react";
import "./Form.css";
import { ItemsContext } from "../../context/SelectedItemsContext";

const Form = ({ id, name, label, placeholder, allowEdit = false, options }) => {
  const { setEditElId } = useContext(ItemsContext);
  const editHandler = (id) => {
    if (allowEdit) {
      setEditElId(id);
    }
  };
  return (
    <div className="el-wrapper" onClick={() => editHandler(id)}>
      {name !== "button" && <label htmlFor={name}>{label}</label>}
      {name === "input" && (
        <input
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
        ></input>
      )}
      {name === "password" && (
        <input
          type="password"
          id={id}
          name={name}
          placeholder={placeholder}
        ></input>
      )}
      {name === "textarea" && (
        <textarea
          id={id}
          name={name}
          rows="4"
          cols="30"
          placeholder={placeholder}
        ></textarea>
      )}
      {name === "select" && (
        <select name={name} id={id}>
          {options.map((opt, index) => (
            <option key={index} value={opt.opValue}>
              {opt.opLabel}
            </option>
          ))}
        </select>
      )}
      {name === "checkbox" && (
        <input type="checkbox" id={id} name={name}></input>
      )}
      {name === "radio" && <input type="radio" id={id} name={name}></input>}
      {name === "date_picker" && (
        <input type="date" id={id} name={name} value={new Date()} />
      )}
      {name === "file_upload" && <input type="file" id={id} name={name} />}
      {name === "button" && (
        <button id={id} name={name}>
          {placeholder}
        </button>
      )}
    </div>
  );
};

export default Form;
