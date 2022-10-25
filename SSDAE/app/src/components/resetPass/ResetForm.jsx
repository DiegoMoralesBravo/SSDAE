import React from 'react'
import { useRef } from 'react';
import { useApi } from '../../hooks/useApi';
export const ResetForm = ({email}) => {


    const inputPass = useRef();
    const inputPassConfirm = useRef();
    const alerta = useRef();
    const api = useApi();



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
                    <input ref={inputPass} type="password" placeholder="Contraseña" required />
                    <input ref={inputPassConfirm} type="password" placeholder="Confirmar contraseña" required />
                    <p ref={alerta} style={{ display: 'none' }} >*Contraseña no concuerdan</p>
                    <button>Cambiar contraseña</button>
                </form>
            </div>
        </div>
    )
}
