import React from 'react'
import { useState } from 'react'

export const Login = ({setLogin}) => {

    const validationLogin = async (e) => {
        e.preventDefault();
        
        let dataForm = {
            user: e.target.user.value,
            password: e.target.password.value
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
        if(data.data){
            setLogin(true);
        }
    }

    return (
        <div>
            <div className="login-page">
                <div className="form" id="Formulario">
                    <form className="login-form" onSubmit={validationLogin}>
                        <input type="text" placeholder="usuario" name='user'/>
                        <input type="password" placeholder="contrasena" name='password'/>
                        <button>login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
