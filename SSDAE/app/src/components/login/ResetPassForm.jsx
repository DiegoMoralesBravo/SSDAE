import React from 'react'

export const ResetPassForm = ({ setShowPassForm }) => {
    const sendEmail = e => {
        e.preventDefault();
    }

    const showLoginForm = e => {
        setShowPassForm(false);
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={sendEmail}>
                    <input type="text" placeholder="Correo electronico" required />
                    <button>Recuperar contraseña</button>
                    <p className="link"><a href="#" onClick={showLoginForm}>Iniciar sesion</a></p>
                </form>
            </div>
        </div>
    )
}
