import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState ,useContext} from "react";
import Form from "../Form/Form";
import { ItemsContext } from "../../context/SelectedItemsContext";

const SingleForm = (id) => {
  const [form, setForm ] = useState("");
  const {setBoardList, setFormName,setUpdateFormID} = useContext(ItemsContext)
  const params = useParams();
  const navigate =  useNavigate()
  useEffect(() => {
    fetch(`http://localhost:8000/api/forms/${params.id}`)
      .then((data) => data.json())
      .then((val) => {
        const created_at = new Date(val.createdAt);
        const updated_at = new Date(val.updatedAt);

        const data = {
          id: val._id,
          name: val.form_name,
          form_data: JSON.parse(val.form_data),
          created_at: convertDate(created_at),
          updated_at: convertDate(updated_at),
        };
        setForm(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const colors = ["#edae49", "#d1495b", "#00798c", "#30638e", "#003d5b"];

  const getRandomArbitrary = (min, max) => {
    const val = Math.random() * (max - min) + min;
    return Math.round(val);
  };

  const convertDate = (date) => {
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()} ${date.toTimeString()}`;
  };

  const editSubmittedForm = () =>{
      setFormName(form.name)
      setBoardList(form.form_data)
      setUpdateFormID(form.id)
      navigate("/")
  }
  return (
    <div  style={{display:"flex",justifyContent:"center"}}>
      {form && (
        <div
          className="form-item"
          style={{ backgroundColor: colors[getRandomArbitrary(0, 5)] }}
        >
          <h2>{form.name}</h2>
          {form?.form_data?.map(({ id, name, placeholder, label ,options="" }) => (
            <Form
              id={id}
              name={name}
              label={label}
              placeholder={placeholder}
              options={options}
              key={id}
            ></Form>
          ))}
          <div className="date">
            <p>
              <span style={{ fontWeight: "700" }}>Created At - </span>
              {form.created_at}
            </p>
            <p>
              <span style={{ fontWeight: "700" }}>Updated At - </span>
              {form.updated_at}
            </p>
          </div>
          <button onClick={()=>editSubmittedForm()}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default SingleForm;
