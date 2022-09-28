import React from 'react';
import { LoginForm } from './LoginForm';
import { ResetPassForm } from './ResetPassForm';


export const Login = ({ setLogin, setShowPassForm, showPassForm }) => {

    let form;

    if (showPassForm) {
        form = <ResetPassForm setShowPassForm={setShowPassForm} />
    } else {
        form = <LoginForm setLogin={setLogin} setShowPassForm={setShowPassForm} showPassForm={showPassForm} />
    }

    return (
        form
    )
}
