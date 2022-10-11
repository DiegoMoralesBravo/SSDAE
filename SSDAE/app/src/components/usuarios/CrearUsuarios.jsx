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
                        
                        <input type="text" placeholder="Nombre" required />
                        
                        <input type="text" placeholder="Apellido paterno" required />
                        
                        <input type="text" placeholder="Apellido materno" required />
                        
                        <input type="email" placeholder="Correo electronico" required />
                        
                        <input type="text" placeholder="2022-A" required />
                        <p style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>
                        <button>Crear usuario</button>
                    </form>
                </div>
            </div>
    )
}