import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { NotFound } from '../NotFound';
import { ResetForm } from './ResetForm';

export const ResetPass = () => {

    const api = useApi();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const key = urlParams.get('key')
    const [view, setView] = useState();

    useEffect(() => {
        const validationToken = async () => {
            console.log('entre a la funcion')
            let dataForm = {
                token: key,
            }
            const url = "http:///localhost:3000/resetPass/tokenvalidation";
            let res = await api.request(url, "POST", dataForm);
            console.log(res)

            if (res.mensaje == 'user found') {
                setView(<ResetForm email={email}/>)
            } else {
                setView(<NotFound/>)
            }

        }
        validationToken()
    }, [])

    return (
        view
    )
}
