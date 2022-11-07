import React from 'react'

export const Revision = () => {
  return (
    <div className="login-page">
        <div className="form">
            <form className="login-form"  >
                <input  type="file" placeholder="Correo electronico" required />
                <p style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>
                <button>Subir archivo</button>
            </form>
        </div>
    </div>
  )
}
