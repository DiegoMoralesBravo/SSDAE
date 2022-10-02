import React from 'react'

export const Navbar = () => {

    let usuario = 'Diego';

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
                            <a href="#!">Cerrar sesion</a>
                        </li>
                    </ul>
                </nav>
            </div>
    )
}
