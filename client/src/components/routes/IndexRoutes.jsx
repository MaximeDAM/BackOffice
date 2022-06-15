import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Projects from "../../pages/Projects";

const IndexRoutes = ({loading}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home loading={loading} />} />
        <Route path="/projects" element={<Projects loading={loading} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRoutes;
