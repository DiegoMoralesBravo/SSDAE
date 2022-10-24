import React from 'react'

import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

export const TablaTesis = () => {


    const [tableInfo, setTableInfo] = useState([]);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(false);
    const api = useApi();




    useEffect(() => {
        console.log('Al cargar')

        reqAll();
    }, [])

    const searchTesis = (e) => {

        setSearch(e.target.value);
        let tesisFound = tableInfo.filter(tesis => {
            const nombre = tesis.nombre + ' ' + tesis.descripcion;
            return nombre.toLowerCase().includes(search.toLowerCase());
        })

        if (search.length <= 1 || tesisFound <= 0) {
            console.log('Pido todo')
            reqAll();
            setResult(true);
        }
        else {
            setTableInfo(tesisFound);
            setResult(false);
            console.log(tesisFound)
        }



    }


    const reqAll = async () => {
        console.log('ENTREEE')
        const url = "http:///localhost:3000/tesis/fillTable";
        const res = await api.request(url, "GET");
        console.log(res)
        setTableInfo(JSON.parse(res))
    }

    const deleteTesis = async (id, tema) => {
        if (confirm("Desea eliminar la tesis: " + tema)) {
            const url = "http:///localhost:3000/tesis/delete";
            const res = await api.request(url, "POST", { id: id });
            reqAll();

        } else {
            console.log('no')
        }

        console.log(id)
    }


    return (
        <div className='container-table'>

            <div className='header'>
                <p>USUARIOS</p>
                <div className='buttons'>

                    <button><NavLink className="boton" to="/CrearTesis"> Crear tesis </NavLink></button>
                    <input type='text' placeholder='Buscar tesis...' onChange={searchTesis} value={search} ></input>


                </div>
            </div>

            {(result == true && search.length > 2) && <p>No se encontro ningun usuario: <strong style={{ color: "red" }}>{search}</strong></p>}

            <table>
                <tbody className='tabla'>
                    <tr>
                        <th><strong>ID</strong></th>
                        <th><strong>Nombre</strong></th>
                        <th><strong>Descripcion</strong></th>
                        <th><strong>Alumno</strong></th>
                        <th><strong>Acciones</strong></th>
                    </tr>

                    {tableInfo.map(tesis => {
                        return (

                            <tr key={tesis.id_tesis} >
                                <td>{tesis.id_tesis}</td>
                                <td>{tesis.tema}</td>
                                <td>{tesis.descripcion}</td>
                                <td>Sin asignar</td>
                                <td>
                                    <button onClick={() => deleteTesis(tesis.id_tesis, tesis.tema)} >Eliminar</button>
                                </td>
                            </tr>


                        );
                    })}

                </tbody>
            </table>

        </div>
    )
}
