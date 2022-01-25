import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./Create";
import Exibition from "./Exibition";

const TrainingSheet = () => {
  return (
    <Routes>
      <Route path="/" element={<Exibition />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
};

export default TrainingSheet;
