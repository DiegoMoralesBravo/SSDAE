import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useApi } from "../../hooks/useApi";

import { useForm } from "../../hooks/useForm";

export const CrearTesis = () => {
  const serialize = useForm();
  const [selected, setSelected] = useState("");
  const api = useApi();

  const alert = useRef();

  const sendData = async (e) => {
    e.preventDefault();

    let data = serialize(e.target);

    let url = "http:///localhost:3000/tesis/create";

    try {
      console.log(data)
      let res = await api.request(url, "POST", data);
      if (res.mensaje == "Tesis created") {
        alert.current.style.display = "block";
        alert.current.style.color = "green";
        alert.current.innerText = "*TESIS CREADA";
        document.getElementById("formulario").reset();
      } else {
        alert.current.style.display = "block";
        alert.current.style.color = "red";
        alert.current.innerText = "*Error, no se creo tesis";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="login-page">
      <div className="form">
        <form id="formulario" className="login-form" onSubmit={sendData}>
          <input
            name="tema"
            type="text"
            placeholder="Tema"
            autoComplete="off"
            required
          />

          <input
            name="descripcion"
            type="text"
            placeholder="Descripcion del tema de tesis"
            autoComplete="off"
            required
          />

          <p ref={alert} style={{ display: "none" }}></p>
          <button>Crear tesis</button>
        </form>
      </div>
    </div>
  );
};
