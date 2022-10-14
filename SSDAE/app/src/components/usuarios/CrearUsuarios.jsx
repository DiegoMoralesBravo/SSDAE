import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginContext } from '../../context/loginContext';

import { useForm } from '../../hooks/useForm';
import { AlumnoForm } from './AlumnoForm';
export const CrearUsuarios = () => {

    const serialize = useForm();
    const inputEmail = useRef();
    const [selected, setSelected] = useState('');
    
    const handleChange = event => {
        setSelected(event.target.value);
    };

    const sendData = e => {
        e.preventDefault();
        let data = serialize(e.target);
        console.log(data);

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

                    <select value={selected} onChange={handleChange}>
                        <option disabled={true} value="">
                            Tipo de usuario...
                        </option>
                        <option value="alumno">Alumno</option>
                        <option value="maestro">Maestro</option>
                    </select>
                    
                    <AlumnoForm />

                    <p style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>
                    <button>Crear usuario</button>
                </form>
            </div>
        </div>
    )
}