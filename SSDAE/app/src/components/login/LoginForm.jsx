import React from 'react'
import { useRef } from 'react';
import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { ResetForm } from '../resetPass/ResetForm';
import { useState } from 'react';
import { useEffect } from 'react';




export const LoginForm = () => {

    const { setShowPassForm, setLogin, setUser, user } = useContext(loginContext);

    const inputEmail = useRef();
    const inputPass = useRef();
    const alert = useRef();
    const api = useApi();



    const [view, setView] = useState();





    const validationLogin = async (e) => {

        e.preventDefault();

        let dataForm = {
            correo: inputEmail.current.value.toLowerCase(),

            contrasena: inputPass.current.value

        };

        const url = "http:///localhost:3000/usuario/validation";

        let res = await api.request(url, "POST", dataForm);



        res.error = ''
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

        } else if (res.mensaje == 'User found change pass') {
            console.log('Cambio de contrasena')

            setView(<ResetForm email={res.user.correo} />)


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



    useEffect(() => {

        const vistaLogin = (<div className="login-page">
        <div className="form">
            <div className='logo-login'>
                <img src=".\public\statics\images\SSDAE.svg" alt="imagen" />
            </div>
            <form className="login-form" onSubmit={validationLogin} >
                <input ref={inputEmail} type="email" placeholder="Correo electronico" required />
                <input ref={inputPass} type="password" placeholder="Contraseña" required />
                <p ref={alert} style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>
                <button>Iniciar sesion</button>
                <p className="link"><a href="#" onClick={showForm} >¿Olvidaste tu contraseña?</a></p>
            </form>
        </div>
    </div>)

    setView(vistaLogin)

    }, [])


    return (
        view
    )
}
