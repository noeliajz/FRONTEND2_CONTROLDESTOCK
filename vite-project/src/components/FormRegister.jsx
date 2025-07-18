import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  NavLink } from "react-router-dom";

const FormRegister = () => {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    nombres: "",
    apellido: "",
    usuario: "",
    contrasenia: "",
    repetirContrasenia: "",
  });
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post("https://backend-control-de-stock-zlqv.vercel.app/api", formInputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Registro exitoso");
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
if (Array.isArray(error.response?.data?.msg)) {
  alert(error.response.data.msg.map(e => e.msg).join("\n"));
} else {
  alert("Error en el registro: " + (error.response?.data?.msg || "Error desconocido."));
}

    }
  };

  return (
  <div className="d-flex py-5 justify-content-center estiloLoginContenedor">
    <form className="w-50">
      <h2 className="form_tittle">Crea una Cuenta</h2>
      <div className="form_container">
        {[
          { name: "nombres", label: "Ingresar nombres", type: "text" },
          { name: "apellido", label: "Ingresar apellidos", type: "text" },
          { name: "usuario", label: "Ingresar usuario", type: "text" },
          { name: "contrasenia", label: "Ingresar contraseña", type: "password" },
          { name: "repetirContrasenia", label: "Repetir contraseña", type: "password" }
        ].map(({ name, label, type }) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name} className="form-label">{label}</label>
            <input
              type={type}
              name={name}
              onChange={handleChange}
              className={`form-control ${errors[name] ? "is-invalid" : ""}`}
              id={name}
              value={formInputs[name]}
              placeholder=" "
              required
              maxLength="25"
            />
            {errors[name] && (
              <div className="invalid-feedback">
                {name === "repetirContrasenia"
                  ? "Las contraseñas no coinciden."
                  : "Debe tener entre 3 y 25 caracteres."}
              </div>
            )}
          </div>
        ))}

        <NavLink
          to="#"
          className="fs-4 colorBoton nav-link "
          onClick={handleSubmit}
          style={{ pointerEvents: loading ? "none" : "auto", textAlign: "center" }}
            >
              {loading ? "Cargando..." : "Ingresar"}
        
          
        </NavLink>
      </div>
    </form>
  </div>
);

};

export default FormRegister;
