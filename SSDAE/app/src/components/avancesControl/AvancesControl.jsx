import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useApi } from '../../hooks/useApi';


export const AvancesControl = () => {

    const [data, setData] = useState([]);
    const api = useApi();


    useEffect(() => {
        console.log('Test')
        getData()
    }, [])

    const getData = async () => {
        const url = "http:///localhost:3000/avances/avancesControl";

        let res = await api.request(url, "GET");
        console.log(res)
        console.log(res.arrayPanel)
        setData(res.arrayPanel);
    }

    return (
        <div className='container-table'>

            <div className='header'>
                <p>Avances panel</p>
            </div>
            <table>
                <tbody className='tabla'>
                    <tr>
                        <th><strong>Ano</strong></th>
                        <th><strong>Ciclo</strong></th>
                        <th><strong>Buzon</strong></th>
                    </tr>

                    {data.map(row => {
                        return (
                            <tr >
                                <td>{row.ano}</td>
                                <td>{row.ciclo}</td>
                                <td><button >Activar</button></td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>


        </div>
    )
}
