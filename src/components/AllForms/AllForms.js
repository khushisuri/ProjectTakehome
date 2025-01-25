import React, { useContext } from "react";
import { ItemsContext } from "../../context/SelectedItemsContext";
import Form from "../Form/Form";
import "./AllForms.css";

const AllForms = () => {
  const { submittedForms } = useContext(ItemsContext);
  const colors = ["#edae49", "#d1495b", "#00798c", "#30638e", "#003d5b"];

  const getRandomArbitrary = (min, max) => {
    const val = Math.random() * (max - min) + min;
    return Math.round(val);
  };

  return (
    <div className="all-forms">
      {submittedForms.length > 0
        ? submittedForms.map((form, index) => (
            <div
              className="form-item"
              style={{ backgroundColor: colors[getRandomArbitrary(0, 5)] }}
              key={index}
            >
              {form.map(({ id, name, placeholder, label }) => (
                <Form
                  id={id}
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  key={id}
                ></Form>
              ))}
            </div>
          ))
        : "No Forms"}
    </div>
  );
};

export default AllForms;
