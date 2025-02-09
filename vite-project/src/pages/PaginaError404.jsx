import React from 'react';
import Error404 from '../assets/Error404.jpg';
import '../css/style.css'; // Importar el CSS

const PaginaError404 = () => {
  return (
    <>
      <div className="error-container">
        <img src={Error404} alt="Error404" className="error-image" />
      </div>
    </>
  );
};

export default PaginaError404;
