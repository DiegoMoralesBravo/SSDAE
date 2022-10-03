import React from 'react'
import { NotFound } from '../NotFound';
import { ResetForm } from './ResetForm';

export const ResetPass = () => {

    let view;
    const queryString = window.location.search;
    console.log('Datos en url:')
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams)
    const product = urlParams.get('product')
    console.log(product);

    console.log(urlParams.has('key'));
    console.log(urlParams.has('email'));




    if (urlParams.has('key') && urlParams.has('email')) {
        view = <ResetForm/>
    } else {
        view = <NotFound />
    }

    return (
        view
    )
}
