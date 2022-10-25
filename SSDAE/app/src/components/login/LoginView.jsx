import React from 'react'

export const LoginView = () => {
  return (
    <div className="login-page">
        <div className="form">
            <form className="login-form" onSubmit={validationLogin} >
                <input ref={inputEmail} type="email" placeholder="Correo electronico" required />
                <input ref={inputPass} type="password" placeholder="Contraseña" required />
                <p ref={alert} style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>
                <button>Iniciar sesion</button>
                <p className="link"><a href="#" onClick={showForm} >¿Olvidaste tu contraseña?</a></p>
            </form>
        </div>
    </div>
  )
}
