import React from 'react'
import { useRef } from 'react';
import { useApi } from '../../hooks/useApi';
import { useForm } from '../../hooks/useForm';




export const EditarUsuarios = (id) => {

    const serialize = useForm();
    const alerta = useRef();
    const api = useApi();
    
    const editUser = async(e) => {
        e.preventDefault();
        console.log(id)
        let data = serialize(e.target);
        console.log(data);

        let url = "http:///localhost:3000/usuario/edit";
        let res = await api.request(url, "POST", data);

        console.log(res)
    }

  return (
    <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={editUser} >
                    <input name="nombre" type="text" placeholder="Nombre" required />
                    <input name="ap_p" type="text" placeholder="Apellido paterno" required />
                    <input name="ap_m" type="text" placeholder="Apellido materno" required />
                    <input name="correo" type="text" placeholder="Correo" required />
                    <p ref={alerta} style={{ display: 'none' }} >*Contraseña no concuerdan</p>
                    <button>Confirmar cambios</button>
                </form>
            </div>
        </div>
  )
}
