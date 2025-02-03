import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import TableProducts from '../components/TableProducts'
import { NavLink } from "react-router-dom";  // Agregar esta importación

const CrudProducts = () => {
  return (
    <>
     <Navbar2/>
     <TableProducts/>
     <NavLink to="/UserPage" className="btn btn-primary">Aceptar</NavLink>
     <Footer/> 
    </>
  )
}

export default CrudProducts
