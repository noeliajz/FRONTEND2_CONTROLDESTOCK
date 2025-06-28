import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Imagen1 from '../assets/Imagen1.jpg'; // Asegúrate de que la extensión es correcta
import Imagen2 from '../assets/Imagen2.jpg';
import Imagen3 from '../assets/Imagen3.jpg';

const Carousel2 = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src={Imagen1} alt="First slide" className="d-block w-100"  height={500}/>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Imagen2} alt="Second slide" className="d-block w-100"  height={500}/>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Imagen3} alt="Third slide" className="d-block w-100"  height={500}/>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Carousel2;
