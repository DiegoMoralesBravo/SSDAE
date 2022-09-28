import React from 'react'

export const ResetPass = ({ setShowPassForm }) => {

    const showLoginForm = e => {
        e.preventDefault();
        setShowPassForm(false);
    }

    return (
        <div>
            <div className="login-page">
                <div className="form">
                    <form className="login-form">
                        <input type="text" placeholder="Correo electronico" />
                        <button>Recuperar contraseña</button>
                        <p className="link"><a href="#" onClick={showLoginForm} >Iniciar sesion</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
