import React from "react";
import Elements from "../Elements";
import Board from "../Board";
import EditForm from "../EditForm/EditForm";
import PreviewForm from "../PreviewForm/PreviewForm";

const MainEl = () => {
  return (
    <main>
      <Elements />
      <Board />
      <EditForm />
      <PreviewForm />
    </main>
  );
};

export default MainEl;
