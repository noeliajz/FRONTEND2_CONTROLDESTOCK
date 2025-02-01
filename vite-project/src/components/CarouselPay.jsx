import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Imagen4 from "../assets/Imagen4.jpg";
import Imagen5 from "../assets/Imagen5.jpg";
  
const CarouselPay = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            src={Imagen4}
            alt=""
            className="d-block w-100 fluid"
            height={200}
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            src={Imagen5}
            alt=""
            className="d-block w-100 fluid"
            height={200}
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
         <img src={Imagen4} alt="" className="d-block w-100 fluid" height={200} />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselPay;
