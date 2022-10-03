import React from 'react'
import { useRef } from 'react';
export const ResetForm = () => {


    const inputPass = useRef();
    const inputPassConfirm = useRef();
    const alert = useRef();

    const passReset = e => {
        e.preventDefault();
        if (inputPass.current.value == inputPassConfirm.current.value) {
            console.log('Contrasenas iguales')
            console.log('Se cambio wey')
        } else {
            console.log('Error no concuerdan contrasenas')
            inputPass.current.className = 'fail';
            inputPassConfirm.current.className = 'fail';
            alert.current.style.display = 'block';
        }

    }
    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={passReset} >
                    <input ref={inputPass} type="password" placeholder="Contraseña" required />
                    <input ref={inputPassConfirm} type="password" placeholder="Confirmar contraseña" required />
                    <p ref={alert} style={{ display: 'none' }} >*Contraseña no concuerdan</p>
                    <button>Cambiar contraseña</button>
                </form>
            </div>
        </div>
    )
}
