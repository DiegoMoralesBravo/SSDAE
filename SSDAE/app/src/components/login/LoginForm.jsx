import React from 'react'
import { useRef } from 'react';
import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { useApi } from '../../hooks/useApi';


export const LoginForm = () => {

    const { setShowPassForm, setLogin, setUser, user } = useContext(loginContext);

    const inputEmail = useRef();
    const inputPass = useRef();
    const alert = useRef();
    const api = useApi();

    const validationLogin = async (e) => {

        e.preventDefault();
        let dataForm = {
            correo: inputEmail.current.value.toLowerCase(),
            contrasena: inputPass.current.value
        };

        const url = "http:///localhost:3000/usuario/validation";
        let res = await api.request(url, "POST", dataForm);

        if (res.mensaje == 'User found') {
            setLogin(true);

            const userData = {
                id_user: res.user.id_usuario,
                correo: res.user.correo,
                nombre: res.user.nombre,
                ap_p: res.user.ap_p,
                tipo_usuario: res.user.tipo_usuario
            };

            setUser(userData)
        }
        else {
            inputEmail.current.className = 'fail';
            inputPass.current.className = 'fail';
            alert.current.style.display = 'block';
            inputPass.current.value = '';
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
