import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useApi } from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";

export const EditarUsuarios = ({ dataUser }) => {
  const serialize = useForm();
  const alerta = useRef();
  const api = useApi();

  const [nombre, setNombre] = useState(dataUser.nombre);
  const [ap_p, setAp_p] = useState(dataUser.ap_p);
  const [ap_m, setAp_m] = useState(dataUser.ap_m);
  const [correo, setCorreo] = useState(dataUser.correo);

  const editUser = async (e) => {
    e.preventDefault();
    let data = serialize(e.target);
    data.id_usuario = dataUser.id_usuario;
    console.log(data);

    let url = "http:///localhost:3000/usuario/edit";

    try {
        let res = await api.request(url, "POST", data);
        if (res.mensaje == "Usuario cambiado") {
          alerta.current.style.display = "block";
          alerta.current.style.color = "green";
        }
    } catch (error) {
        console.log(error)
    }
  };

  const onChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const onChangeAp_p = (e) => {
    setAp_p(e.target.value);
  };

  const onChangeAp_m = (e) => {
    setAp_m(e.target.value);
  };

  const onChangeCorreo = (e) => {
    setCorreo(e.target.value);
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={editUser}>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={onChangeNombre}
            required
          />
          <input
            name="ap_p"
            type="text"
            placeholder="Apellido paterno"
            value={ap_p}
            onChange={onChangeAp_p}
            required
          />
          <input
            name="ap_m"
            type="text"
            placeholder="Apellido materno"
            value={ap_m}
            onChange={onChangeAp_m}
            required
          />
          <input
            name="correo"
            type="text"
            placeholder="Correo"
            value={correo}
            onChange={onChangeCorreo}
            required
          />
          <p ref={alerta} style={{ display: "none" }}>
            *Usuario modificado
          </p>
          <button>Confirmar cambios</button>
        </form>
      </div>
    </div>
  );
};
