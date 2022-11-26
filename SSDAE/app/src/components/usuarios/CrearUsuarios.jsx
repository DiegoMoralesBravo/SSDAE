import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useApi } from "../../hooks/useApi";

import { useForm } from "../../hooks/useForm";
import { AlumnoForm } from "./AlumnoForm";
import { MaestroForm } from "./MaestroForm";
export const CrearUsuarios = () => {
  const serialize = useForm();
  const [selected, setSelected] = useState("");
  const api = useApi();

  const alert = useRef();

  //comentario cambiado
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const sendData = async (e) => {
    e.preventDefault();

    let data = serialize(e.target);

    let url = "http:///localhost:3000/usuario/emailValidation";
    try {
      let res = await api.request(url, "POST", data);
      console.log(res);
      console.log(res.mensaje);

      if (res.mensaje == "User found") {
        alert.current.style.display = "block";
        alert.current.style.color = "red";
        alert.current.innerText = "*Usuario con este correo ya existe";
      } else {
        if (
          data.hasOwnProperty("tipo_usuario") &&
          ((data.tipo_usuario == "maestro" &&
            data.hasOwnProperty("interno_externo")) ||
            data.tipo_usuario == "alumno")
        ) {
          alert.current.style.display = "none";

          url = "http:///localhost:3000/usuario/create";
          res = await api.request(url, "POST", data);
          if (res.mensaje == "User created") {
            alert.current.style.display = "block";
            alert.current.style.color = "green";
            alert.current.innerText = "*USUARIO CREADO";
            document.getElementById("formulario").reset();
          }
        } else {
          alert.current.style.display = "block";
          alert.current.style.color = "red";
          alert.current.innerText = "*Llenar todos los campos antes de enviar";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form id="formulario" className="login-form" onSubmit={sendData}>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            autoComplete="off"
            required
          />

          <input
            name="ap_p"
            type="text"
            placeholder="Apellido paterno"
            autoComplete="off"
            required
          />

          <input
            name="ap_m"
            type="text"
            placeholder="Apellido materno"
            autoComplete="off"
            required
          />

          <input
            name="correo"
            type="email"
            placeholder="Correo electronico"
            autoComplete="off"
            required
          />

          <select name="tipo_usuario" value={selected} onChange={handleChange}>
            <option disabled={true} value="">
              Tipo de usuario...
            </option>
            <option value="alumno">Alumno</option>
            <option value="maestro">Maestro</option>
          </select>

          {selected == "alumno" && <AlumnoForm />}
          {selected == "maestro" && <MaestroForm />}

          <p ref={alert} style={{ display: "none" }}></p>
          <button>Crear usuario</button>
        </form>
      </div>
    </div>
  );
};
