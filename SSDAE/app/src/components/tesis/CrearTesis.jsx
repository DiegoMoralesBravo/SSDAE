import React from 'react'
import { useRef } from 'react'
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';

import { useForm } from '../../hooks/useForm';


export const CrearTesis = () => {


    const serialize = useForm();
    const [selected, setSelected] = useState('');
    const api = useApi();

    const alert = useRef();


    const sendData = async (e) => {
        e.preventDefault();
        console.log('Se envia el formulario');

        let data = serialize(e.target);
        console.log(data);

        let url = "http:///localhost:3000/tesis/create";
        let res = await api.request(url, "POST", data);

        console.log(res)
        console.log(res.mensaje)

        if (res.mensaje == 'Tesis created') {
            alert.current.style.display = 'block';
            alert.current.style.color = 'green';
            alert.current.innerText = '*TESIS CREADA'
            document.getElementById("formulario").reset();
        } else {
            alert.current.style.display = 'block';
            alert.current.style.color = 'red';
            alert.current.innerText = '*Error, no se creo tesis'
        }
    }

    const handleChange = event => {
        setSelected(event.target.value);
    };

    return (
        <div className="login-page">
            <div className="form">
                <form id='formulario' className="login-form" onSubmit={sendData} >

                    <input name="tema" type="text" placeholder="Tema" required />

                    <input name="descripcion" type="text" placeholder="Descripcion del tema de tesis" required />

                    <p ref={alert} style={{ display: 'none' }} ></p>
                    <button>Crear tesis</button>
                </form>
            </div>
        </div>)
}
