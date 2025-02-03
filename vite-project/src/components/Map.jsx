import React from "react";
import { ArrayPersona } from "../data/arrayPersona";

const Map = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <ul >{ArrayPersona.map((persona) => {
                <>
                  <li key={persona.id}>persona.nombre</li>
                  <li>persona.apellido</li>
                </>
            })}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
