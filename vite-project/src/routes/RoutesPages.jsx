import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PaginaError404 from "../pages/PaginaError404"
import UserPage from "../pages/UserPage";
import AddProducts from "../pages/AddProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CrudProducts from "../pages/CrudProducts";
import NewProduct from "../pages/NewProduct";
import CrudUsers from "../pages/CrudUsers"
import NewUser from "../pages/NewUser";
import ProductEdit from "../pages/ProductEdit";
import UserEdit from "../pages/UserEdit";


function RoutesPage() {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='*' element={<PaginaError404/>}/>
        <Route path='/error404' element={<PaginaError404/>}/>
        <Route path='/UserPage' element={<UserPage/>}/>
        <Route path='/AddProducts' element={<AddProducts/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/CrudProducts' element={<CrudProducts/>}/>
        <Route path='/NewProduct' element={<NewProduct/>}/>
        <Route path='/CrudUsers' element={<CrudUsers/>}/>
        <Route path='/NewUser' element={<NewUser/>}/>
        <Route path='/ProductEdit/:id' element={<ProductEdit/>}/>
        <Route path='/UserEdit/:id' element={<UserEdit/>}/>

      </Routes>
  );
}

export default RoutesPage;
