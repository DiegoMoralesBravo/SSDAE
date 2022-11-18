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

    const { nombre, ap_p, tipo_usuario } = user

    return (
        <div className="nav-container">
            <div className="brand">
                <a href="#!">Sistema de Seguimiento para Desempeño Académico</a>
            </div>
            <nav className='navbar'>
                <ul className="nav-list">
                    <li>
                        <NavLink to="/"> {nombre + ' ' + ap_p + ' (' + tipo_usuario + ')'} </NavLink>
                    </li>

                    <li>
                        {
                            tipo_usuario == 'root' ? <NavLink to="/Usuarios"> Usuarios </NavLink> : ''
                        }
                    </li>
                    <li>
                        {
                            tipo_usuario == 'root' ? <NavLink to="/Tesis"> Tesis </NavLink> : ''
                        }

                    </li>
                    <li>
                        {
                            tipo_usuario == 'root' ? <NavLink to="/historial"> Historial </NavLink> : ''
                        }
                    </li>
                    

                    </li>

                    {tipo_usuario == 'root' ? <>
                        <li>
                            <NavLink to="/Usuarios"> Usuarios </NavLink>
                        </li>
                        <li>
                        <NavLink to="/Tesis"> Tesis </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Avances"> Avances </NavLink>
                        </li>
                    </> : ''}

                    {tipo_usuario == 'alumno' ? <>
                        <li>
                            <NavLink to="/Avances"> Avances </NavLink>
                        </li>
                    </> : ''}


                    <li>
                        <NavLink to="/" onClick={logout} > Cerrar sesion </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
