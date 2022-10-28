import React from 'react'
import { useRef } from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
export const ResetForm = ({email}) => {


    const inputPass = useRef();
    const inputPassConfirm = useRef();
    const alerta = useRef();
    const api = useApi();
    const navigate = useNavigate();



    const passReset = async (e) => {
        e.preventDefault();
        if (inputPass.current.value == inputPassConfirm.current.value) {
            console.log('Contrasenas iguales')

            let dataForm = {
                email,
                password: inputPassConfirm.current.value
            }

            const url = "http:///localhost:3000/resetPass/passChange";
            let res = await api.request(url, "POST", dataForm);

            console.log(res)


            alert('Cambio de contrasena correcto, se redirecciona a inicio');
            navigate('/*')


        } else {
            console.log('Error no concuerdan contrasenas')
            inputPass.current.className = 'fail';
            inputPassConfirm.current.className = 'fail';
            alerta.current.style.display = 'block';
        }

    }



    
    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={passReset} >
                    <input ref={inputPass} type="password" placeholder="Contraseña" autoComplete="off" required />
                    <input ref={inputPassConfirm} type="password" placeholder="Confirmar contraseña" autoComplete="off" required />
                    <p ref={alerta} style={{ display: 'none' }} >*Contraseña no concuerdan</p>
                    <button>Cambiar contraseña</button>
                </form>
            </div>
        </div>
    )
}
