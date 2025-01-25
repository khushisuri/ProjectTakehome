import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const ItemsContext = createContext("");

const SelectedItemsContext = ({ children }) => {
  const elList = [
    {
      id: 1,
      name: "input",
      label: "input",
      placeholder: "placeholder",
      required: false,
    },
    {
      id: 2,
      name: "password",
      label: "password",
      placeholder: "placeholder",
      required: false,
    },
    {
      id: 3,
      name: "textarea",
      label: "textarea",
      placeholder: "placeholder",
      required: false,
    },
    {
      id: 4,
      name: "select",
      label: "select",
      placeholder: "placeholder",
      required: false,
    },
    {
      id: 5,
      name: "checkbox",
      label: "checkbox",
      placeholder: "placeholder",
      required: false,
    },
    {
      id: 6,
      name: "radio",
      label: "radio",
      placeholder: "placeholder",
      required: false,
    },
    {
      id: 7,
      name: "date_picker",
      label: "date picker",
      placeholder: "placeholder",
      required: false,
    },
    {
      id: 8,
      name: "file_upload",
      label: "file upload",
      placeholder: "placeholder",
      required: false,
    },
    {
      id: 9,
      name: "button",
      placeholder: "button",
    },
  ];
  const [boardList, setBoardList] = useState([]);
  const [editElId, setEditElId] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [submittedForms,setSubmittedForms] = useState([]);

  const addItemToBoard = (id) => {
    const selectedEl = elList.filter((el) => el.id === id);
    setBoardList((boardList) => [
      ...boardList,
      { ...selectedEl[0], id: boardList.length + 1 },
    ]);
  };
  return (
    <ItemsContext.Provider
      value={{
        elList,
        boardList,
        setBoardList,
        addItemToBoard,
        editElId,
        setEditElId,
        showPreview,
        setShowPreview,
        submittedForms,
        setSubmittedForms
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default SelectedItemsContext;
