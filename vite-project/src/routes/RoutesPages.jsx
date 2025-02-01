import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PaginaError404 from "../pages/PaginaError404"
import UserPage from "../pages/UserPage";
import AddProducts from "../pages/AddProducts";




function RoutesPage() {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='*' element={<PaginaError404/>}/>
        <Route path='/error404' element={<PaginaError404/>}/>
        <Route path='/UserPage' element={<UserPage/>}/>
        <Route path='/AddProducts' element={<AddProducts/>}/>

      </Routes>
  );
}

export default RoutesPage;
