import React  , { useState }  from 'react'

const FormRegister = () => {
  const [formInputs, setFormInputs] = useState({
    nombres: "",
    apellido: "",
    email: "",
    contrasenia: "",
  });

  const [errors, setErrors] = useState({
    nombres: false,
    apellido: false,
    email: false,
    contrasenia: false,
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    if (value.length > 25) return;

    setFormInputs({ ...formInputs, [name]: value });

    const isInvalid =
      (name === "nombres" || name === "apellido") && (value.length < 3 || value.length > 25) ||
      name === "email" && (value.length < 3 || value.length > 25) ||
      name === "contrasenia" && (value.length < 4 || value.length > 25);

    setErrors({ ...errors, [name]: isInvalid });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formInputs.nombres.length < 3 ||
      formInputs.apellido.length < 3 ||
      formInputs.email.length < 3 ||
      formInputs.contrasenia.length < 4
    ) {
      alert("Por favor, completa los campos correctamente.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api", formInputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Registro exitoso");
      setTimeout(() => {
        location.href = "/IniciarSesion";
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
          <div className="mb-3">
            <label htmlFor="nombres" className="form-label">Ingresar nombres</label>
            <input
              type="text"
              name="nombres"
              onChange={handleChange}
              className={`form-control ${errors.nombres ? "is-invalid" : ""}`}
              id="nombres"
              value={formInputs.nombres}
              placeholder=" "
              required
              maxLength="25"
            />
            {errors.nombres && <div className="invalid-feedback">El nombre debe tener entre 3 y 25 caracteres.</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">Ingresar apellidos</label>
            <input
              type="text"
              name="apellido"
              onChange={handleChange}
              className={`form-control ${errors.apellido ? "is-invalid" : ""}`}
              id="apellido"
              value={formInputs.apellido}
              placeholder=" "
              required
              maxLength="25"
            />
            {errors.apellido && <div className="invalid-feedback">El apellido debe tener entre 3 y 25 caracteres.</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Ingresar email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              value={formInputs.email}
              placeholder=" "
              required
              maxLength="25"
            />
            {errors.email && <div className="invalid-feedback">El email debe tener entre 3 y 25 caracteres.</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="contrasenia" className="form-label">Ingresar contraseña</label>
            <input
              type="password"
              name="contrasenia"
              onChange={handleChange}
              className={`form-control ${errors.contrasenia ? "is-invalid" : ""}`}
              id="contrasenia"
              value={formInputs.contrasenia}
              placeholder=" "
              required
              maxLength="25"
            />
            {errors.contrasenia && <div className="invalid-feedback">La contraseña debe tener entre 4 y 25 caracteres.</div>}
          </div>

          <button type="submit" className="btn" style={{ color: "#CCFF01", background: "#000000" }}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormRegister
