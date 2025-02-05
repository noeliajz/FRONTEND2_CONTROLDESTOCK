import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormRegister = () => {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    nombres: "",
    apellido: "",
    usuario: "",
    contrasenia: "",
    repetirContrasenia: "",
  });

  const [errors, setErrors] = useState({
    nombres: false,
    apellido: false,
    usuario: false,
    contrasenia: false,
    repetirContrasenia: false,
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    
    if (value.length > 25) return;

    setFormInputs((prev) => ({ ...prev, [name]: value }));

    const isInvalid = (
      (name === "nombres" && (value.length < 3 || value.length > 25)) ||
      (name === "apellido" && (value.length < 3 || value.length > 25)) ||
      (name === "usuario" && (value.length < 3 || value.length > 25)) ||
      (name === "contrasenia" && (value.length < 4 || value.length > 25)) ||
      (name === "repetirContrasenia" && value !== formInputs.contrasenia)
    );

    setErrors((prev) => ({ ...prev, [name]: isInvalid }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(errors).some((err) => err) || 
        formInputs.nombres.length < 3 ||
        formInputs.apellido.length < 3 ||
        formInputs.usuario.length < 3 || 
        formInputs.contrasenia.length < 4 ||
        formInputs.contrasenia !== formInputs.repetirContrasenia) {
      alert("Por favor, completa los campos correctamente.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api", formInputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Registro exitoso");
      setTimeout(() => {
        navigate("/UserPage");
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Ocurrió un error desconocido. Intente nuevamente.";
      alert("Error en el registro: " + errorMessage);
    }
  };

  return (
    <div className="d-flex py-5 justify-content-center" style={{ background: "#FFFFFF" }}>
      <form className="w-50" onSubmit={handleSubmit}>
        <h2 className="form_tittle">Crea una Cuenta</h2>
        <div className="form_container">
          
          {["nombres", "apellido", "usuario", "contrasenia", "repetirContrasenia"].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="form-label">
                {`Ingresar ${field}`}
              </label>
              <input
                type={field.includes("contrasenia") ? "password" : "text"}
                name={field}
                onChange={handleChange}
                className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                id={field}
                value={formInputs[field]}
                placeholder=" "
                required
                maxLength="25"
              />
              {errors[field] && (
                <div className="invalid-feedback">
                  {field === "repetirContrasenia"
                    ? "Las contraseñas no coinciden."
                    : field === "contrasenia"
                      ? "La contraseña debe tener entre 4 y 25 caracteres."
                      : "Debe tener entre 3 y 25 caracteres."
                  }
                </div>
              )}
            </div>
          ))}

          <button 
            type="submit" 
            className="btn" 
            style={{ color: "#CCFF01", background: "#000000" }}
            onClick={() => console.log("Botón clickeado")}
          >
            Enviar
          </button>

        </div>
      </form>
    </div>
  );
};

export default FormRegister;
