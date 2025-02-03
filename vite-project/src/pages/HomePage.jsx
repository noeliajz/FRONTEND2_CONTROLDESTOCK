import React from 'react'
import Navbar2 from '../components/Navbar2'
import Carousel2 from '../components/Carousel2'
import CardAllProducts from '../components/CardAllProducts'
import Footer from '../components/Footer'


const HomePage = () => {
  return (
    <>
     <Carousel2/>
     <h1>ENVIO GRATIS a todo el país a partir de $149.990</h1>
     <CardAllProducts/>
    </>
  )
}

export default HomePage
