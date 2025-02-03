import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import TableProducts from '../components/TableProducts'
import { NavLink } from "react-router-dom";  // Agregar esta importación

const CrudProducts = () => {
  return (
    <>
     <TableProducts/>
     <NavLink to="/UserPage" className="btn btn-primary">Aceptar</NavLink>
    </>
  )
}

export default CrudProducts
