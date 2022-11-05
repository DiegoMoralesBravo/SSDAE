import React from 'react'
import { useRef } from 'react';
import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { useApi } from '../../hooks/useApi';


export const ResetPassForm = () => {

    const { setShowPassForm } = useContext(loginContext);

    const api = useApi();
    const inputEmail = useRef();
    const alert = useRef();
    




    const sendEmail = async (e) => {
        e.preventDefault();

        let dataForm = {
            correo: inputEmail.current.value,
        };

        inputEmail.current.value = '';
        
        const url = "http:///localhost:3000/resetPass/userValidation";
        let res = await api.request(url, "POST", dataForm);


        alert.current.style.display = 'block';
        alert.current.style.color = 'green';
        console.log(res)



        
    }




    const showLoginForm = e => {
        setShowPassForm(false);
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={sendEmail}>


                    <input ref={inputEmail} type="email" placeholder="Correo electronico" required />
                    <button>Recuperar contraseña</button>


                    <p ref={alert} style={{ display: 'none' }} >Correo para cambio de contrasena enviado</p>
                    <p className="link"><a href="#" onClick={showLoginForm}>Iniciar sesion</a></p>
                </form>
            </div>
        </div>
    )
}
