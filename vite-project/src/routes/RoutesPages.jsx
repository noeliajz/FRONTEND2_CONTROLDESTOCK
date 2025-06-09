import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PaginaError404 from "../pages/PaginaError404";
import UserPage from "../pages/UserPage";
import AddProducts from "../pages/AddProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CrudProducts from "../pages/CrudProducts";
import NewProduct from "../pages/NewProduct";
import CrudUsers from "../pages/CrudUsers";
import NewUser from "../pages/NewUser";
import ProductEdit from "../pages/ProductEdit";
import UserEdit from "../pages/UserEdit";
import Contacto from "../pages/Contacto";
import Quien from "../pages/Quien";
import ProtectedRoutes from "./ProtectedRoutes";
import { AuthContext } from "../context/AuthContext";

function RoutesPage() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<PaginaError404 />} />
      <Route path="/error404" element={<PaginaError404 />} />
      <Route path="/UserPage" element={<UserPage />} />
      <Route path="/AddProducts" element={<AddProducts />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route
        path="/CrudProducts"
        element={
          <ProtectedRoutes auth={auth}>
            <CrudProducts />
          </ProtectedRoutes>
        }
      />
      <Route path="/NewProduct" element={
        <ProtectedRoutes auth={auth}>
            <NewProduct />
          </ProtectedRoutes>} />
      <Route path="/CrudUsers" element={
        <ProtectedRoutes auth={auth}>
            <CrudUsers />
          </ProtectedRoutes>
      } />
      <Route path="/NewUser" element={
        <ProtectedRoutes auth={auth}>
            <NewUser />
          </ProtectedRoutes>} />
      <Route path="/ProductEdit/:id" element={
        <ProtectedRoutes auth={auth}>
            <ProductEdit />
          </ProtectedRoutes>
      } />
      <Route path="/UserEdit/:id" element={
        <ProtectedRoutes auth={auth}>
            <UserEdit />
          </ProtectedRoutes>
      } />
      <Route path="/Contacto" element={<Contacto />} />
      <Route path="/Quien" element={<Quien />} />
    </Routes>
  );
}

export default RoutesPage;
