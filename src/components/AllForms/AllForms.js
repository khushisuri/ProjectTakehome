import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../../context/SelectedItemsContext";
import Form from "../Form/Form";
import "./AllForms.css";

const AllForms = () => {
  const { submittedForms, setSubmittedForms } = useContext(ItemsContext);
  const colors = ["#edae49", "#d1495b", "#00798c", "#30638e", "#003d5b"];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    fetch("http://localhost:8000/api/forms/list")
      .then((data) => data.json())
      .then((val) => {
        const arr = [];
        val.forEach((item) => {
          const created_at = new Date(item.createdAt);
          const updated_at = new Date(item.updatedAt);
          

          const data = {
            name: item.form_name,
            form_data: JSON.parse(item.form_data),
            created_at: convertDate(created_at),
            updated_at: convertDate(updated_at),
          };
          
          arr.push(data);
          setSubmittedForms(arr);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getRandomArbitrary = (min, max) => {
    const val = Math.random() * (max - min) + min;
    return Math.round(val);
  };

  const convertDate = (date) => {
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${date.toTimeString()}`;
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
              <h2>{form.name}</h2>
              {form?.form_data?.map(({ id, name, placeholder, label }) => (
                <Form
                  id={id}
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  key={id}
                ></Form>
              ))}
              <div className="date"> 
                <p><span style={{fontWeight:"700"}}>Created At - </span>{form.created_at}</p>
                <p><span style={{fontWeight:"700"}}>Updated At - </span>{form.updated_at}</p>
              </div>
            </div>
          ))
        : "No Forms"}
    </div>
  );
};

export default AllForms;
