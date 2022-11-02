import React from 'react'
import { Ventana } from '../Ventana';
import { AsignarAlumno } from './detalles/alumno/AsignarAlumno';
import { AsignarProfesor } from './AsignarProfesor';
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { CrearTesis } from './CrearTesis';
import { useLayoutEffect } from 'react';
import { Detalles } from './detalles/Detalles';


export const TablaTesis = () => {


    const [tableInfo, setTableInfo] = useState([]);
    const [tableInfoName, setTableInfoName] = useState([]);
    const [dataTesis, setDataTesis] = useState({})
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(false);
    const [visibleCreateTesis, setVisibleCreateTesis] = useState(false);
    const [visibleDetails, setVisibleDetails] = useState(false);
    const api = useApi();


    useLayoutEffect(() => {
        reqAll();
    }, [, visibleCreateTesis, visibleDetails])


    const searchTesis = (e) => {
        setSearch(e.target.value);
        let tesisFound = tableInfo.filter(tesis => {
            const nombre = tesis.nombre + ' ' + tesis.descripcion;
            return nombre.toLowerCase().includes(search.toLowerCase());
        })

        if (search.length <= 1 || tesisFound <= 0) {
            reqAll();
            setResult(true);
        }
        else {
            setTableInfo(tesisFound);
            setResult(false);
        }
    }

    const reqAll = async () => {
        const url = "http:///localhost:3000/tesis/fillTable";
        const res = await api.request(url, "GET");

        console.log(res)

        setTableInfo(res.tesis)
        setTableInfoName(res.alumnos)
    }



    const deleteTesis = async (id, tema) => {
        if (confirm("Desea eliminar la tesis: " + tema)) {
            const url = "http:///localhost:3000/tesis/delete";
            const res = await api.request(url, "POST", { id: id });
            reqAll();

        }
    }

    const setDataTesisFunction = (tesis) => {
        setDataTesis({
            id: tesis.id_tesis,
            tema: tesis.tema,
            descripcion: tesis.descripcion,
            id_alumno: tesis.id_alumno
        })
        setVisibleDetails(true);
    }


    return (
        <div className='container-table'>

            <div className='header'>
                <p>TESIS</p>
                <div className='buttons'>
                    <button className="boton" onClick={() => setVisibleCreateTesis(true)} > Crear tesis </button>
                    <input type='text' placeholder='Buscar tesis...' onChange={searchTesis} value={search} ></input>
                </div>
            </div>

            {(result == true && search.length > 2) && <p>No se encontro ninguna tesis: <strong style={{ color: "red" }}>{search}</strong></p>}

            <table>
                <tbody className='tabla'>
                    <tr>
                        <th><strong>Tema</strong></th>
                        <th><strong>Alumno</strong></th>
                        <th><strong>Director</strong></th>
                        <th><strong>Acciones</strong></th>
                    </tr>

                    {tableInfo.map(tesis => {
                        return (
                            
                                <tr key={tesis.id_tesis}>
                                    <td>{tesis.tema}</td>
                                    <td>{tableInfoName.map(alumno => {
                                        return(
                                        alumno.id_usuario == tesis.id_alumno ? alumno.nombre + ' ' + alumno.ap_p + ' ' + alumno.ap_m : ''
                                        )})}
                                        </td>
                                    <td>{tesis.id_alumno}</td>
                                    <td>
                                        <button onClick={() => setDataTesisFunction(tesis)}>Detalles</button>
                                        <button onClick={() => deleteTesis(tesis.id_tesis, tesis.tema)} >Eliminar</button>
                                    </td>
                                </tr>                           
                        )
                    })}

                </tbody>
            </table>

            {visibleCreateTesis && <Ventana componente={<CrearTesis />} setVisible={setVisibleCreateTesis} />}
            {visibleDetails && <Ventana componente={<Detalles dataTesis={dataTesis} />} setVisible={setVisibleDetails} />}

        </div>
    )
}
