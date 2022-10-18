import React from 'react'
import { useRef } from 'react'
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';

import { useForm } from '../../hooks/useForm';
import { AlumnoForm } from './AlumnoForm';
import { MaestroForm } from './MaestroForm';
export const CrearUsuarios = () => {

    const serialize = useForm();
    const [selected, setSelected] = useState('');
    const api = useApi();

    const alert = useRef();

    

    //comentario cambiado
    const handleChange = event => {
        setSelected(event.target.value);
    };

    const sendData = async(e) => {
        e.preventDefault();

        let data = serialize(e.target);
        console.log(data);

        if (data.hasOwnProperty('tipo_usuario') && (data.tipo_usuario == 'maestro' && data.hasOwnProperty('interno_externo') || data.tipo_usuario == 'alumno')) {
            alert.current.style.display = 'none';


            const url = "http:///localhost:3000/usuario/create";
            let res = await api.request(url, "POST", data);
            console.log(res)


            console.log('se envia a base')
        } else {
            alert.current.style.display = 'block';
        }


        console.log('Salida')
    }


    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={sendData} >

                    <input name="nombre" type="text" placeholder="Nombre" required />

                    <input name="ap_p" type="text" placeholder="Apellido paterno" required />

                    <input name="ap_m" type="text" placeholder="Apellido materno" required />

                    <input name="correo" type="email" placeholder="Correo electronico" required />

                    <select name="tipo_usuario" value={selected} onChange={handleChange}>
                        <option disabled={true} value="">
                            Tipo de usuario...
                        </option>
                        <option value="alumno">Alumno</option>
                        <option value="maestro">Maestro</option>
                    </select>

                    {selected == 'alumno' && <AlumnoForm />}
                    {selected == 'maestro' && <MaestroForm />}

                    <p ref={alert} style={{ display: 'none' }} >*Llenar todos los campos antes de enviar</p>
                    <button>Crear usuario</button>
                </form>
            </div>
        </div>
    )
}