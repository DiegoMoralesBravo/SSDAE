import React from 'react'
import { useContext } from 'react';
import { loginContext } from '../context/loginContext';

export const Navbar = () => {

    const { setShowPassForm, setLogin, setUser, user } = useContext(loginContext);

    let usuario = 'Diego';

    const logout = () => {
        setLogin(false);
        setUser('');
    };

    return (
            <div className="nav-container">
                <div className="brand">
                    <a href="#!">SSDAE</a>
                </div>
                <nav className='navbar'>
                    <ul className="nav-list">
                        <li>
                            <a href="#!">{usuario}</a>
                        </li>
                        <li>
                            <a href="#!"  onClick={logout} >Cerrar sesion</a>
                        </li>
                    </ul>
                </nav>
            </div>
    )
}
