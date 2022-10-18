import React from 'react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { loginContext } from '../context/loginContext';

export const Navbar = () => {

    const { setShowPassForm, setLogin, setUser, user } = useContext(loginContext);

    const logout = () => {
        setLogin(false);
        setUser('');
    };

    const {nombre, ap_p, tipo_usuario} = user

    return (
            <div className="nav-container">
                <div className="brand">
                    <a href="#!">SSDAE</a>
                </div>
                <nav className='navbar'>
                    <ul className="nav-list">
                        <li>
                        <NavLink to="/"> {nombre + ' ' + ap_p + ' ('+ tipo_usuario +')'} </NavLink>
                        </li>
                        <li>
                        {
                            tipo_usuario == 'alumno' ?  <NavLink to="/Usuarios"> Usuarios </NavLink> : ''
                        }
                        </li>
                        <li>
                        <NavLink to="/" onClick={logout} > Cerrar sesion </NavLink> 
                        </li>
                    </ul>
                </nav>
            </div>
    )
}
