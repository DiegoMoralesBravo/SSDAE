import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginContext } from '../../context/loginContext';

export const CrearUsuarios = () => {

    return (
        <div className="login-page">
                <div className="form">
                    <form className="login-form" >
                        <label>Correo</label>
                        <input type="email" placeholder="Correo electronico" required />
                        <input type="password" placeholder="Contraseña" required />
                        <p style={{ display: 'block' }} >*Usuario y/o contraseña incorrectos</p>
                        <button>Crear usuario</button>
                    </form>
                </div>
            </div>
    )
}