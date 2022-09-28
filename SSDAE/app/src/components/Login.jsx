import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'

export const Login = ({ setLogin, setShowPassForm }) => {

    const inputEmail = useRef();
    const inputPass = useRef();
    const alert = useRef();

    const showPassForm = e => {
        e.preventDefault();
        setShowPassForm(true);
    }

    const validationLogin = async (e) => {
        e.preventDefault();

        let dataForm = {
            user: inputEmail.current.value,
            password: inputPass.current.value
        };

        const url = "http:///localhost:3000/user/validation";

        let request = await fetch(url, {
            method: "POST",
            body: JSON.stringify(dataForm),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let data = await request.json();
        console.log(data)
        console.log(data.mensaje)
        if (data.mensaje == 'User found') {
            setLogin(true);
        }
        else {  
            inputEmail.current.className = 'fail';
            inputPass.current.className = 'fail';
            alert.current.style.display = 'block';
        }
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={validationLogin} >
                    <input ref={inputEmail} type="text" placeholder="Correo electronico" required/>
                    <input ref={inputPass} type="password" placeholder="Contraseña" required/>
                    <p ref={alert} style={{display:'none'}} >*Usuario y/o contraseña incorrectos</p>
                    <button>Iniciar sesion</button>
                    <p className="link"><a href="#" onClick={showPassForm} >¿Olvidaste tu contraseña?</a></p>
                </form>
            </div>
        </div>
    )
}
