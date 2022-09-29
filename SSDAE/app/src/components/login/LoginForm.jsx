import React from 'react'
import { useRef } from 'react';
import { useApi } from '../../hooks/useApi';


export const LoginForm = ({ setLogin, setShowPassForm, showPassForm }) => {

    const inputEmail = useRef();
    const inputPass = useRef();
    const alert = useRef();
    const api = useApi();

    const validationLogin = async (e) => {


        e.preventDefault();
        let dataForm = {
            user: inputEmail.current.value,
            password: inputPass.current.value
        };
        
        const url = "http:///localhost:3000/user/validation";
        let res = await api.request(url, "POST", dataForm);

        if (res.mensaje == 'User found') {
            setLogin(true);
        }
        else {
            inputEmail.current.className = 'fail';
            inputPass.current.className = 'fail';
            alert.current.style.display = 'block';
        }
    }

    const showForm = e => {
        e.preventDefault();
        setShowPassForm(true);
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={validationLogin} >
                    <input ref={inputEmail} type="text" placeholder="Correo electronico" required />
                    <input ref={inputPass} type="password" placeholder="Contraseña" required />
                    <p ref={alert} style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>
                    <button>Iniciar sesion</button>
                    <p className="link"><a href="#" onClick={showForm} >¿Olvidaste tu contraseña?</a></p>
                </form>
            </div>
        </div>
    )
}
