import React from 'react';
import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { LoginForm } from './LoginForm';
import { ResetPassForm } from './ResetPassForm';


export const Login = () => {
    
    const { showPassForm } = useContext(loginContext);
    
    let form;

    if (showPassForm) {
        form = <ResetPassForm />
    } else {
        form = <LoginForm />
    }

    return (
        form
    )
}
