import React from 'react'
import { Ventana } from '../Ventana';
import { AsignarAlumno } from './AsignarAlumno';
import { AsignarProfesor } from './AsignarProfesor';
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { CrearTesis } from './CrearTesis';
import { useLayoutEffect } from 'react';
import { Detalles } from './detalles/Detalles';
import { useId } from 'react';
import {Fragment} from 'react';

export const TablaTesis = () => {


    const [tableInfo, setTableInfo] = useState([]);
    const [tableInfoName, setTableInfoName] = useState([]);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(false);
    const [visibleCreateTesis, setVisibleCreateTesis] = useState(false);
    const [visibleAsignProfesor, setVisibleAsignProfesor] = useState(false);
    const [visibleAsignStudent, setVisibleAsignStudent] = useState(false);
    const [idTesis, setIdTesis] = useState();
    const api = useApi();


    useLayoutEffect(() => {
        reqAll();
    }, [, visibleCreateTesis, visibleAsignStudent, visibleAsignProfesor])


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
        const resJson = JSON.parse(res);
        resJson.map(async usuario => {
            setTableInfoName(reqName(usuario.id_alumno))
            usuario.nombreCompleto = tableInfoName;
        })
        setTableInfo(resJson)
    }

    const reqName = async (id_alumno) => {
        const url = "http:///localhost:3000/tesis/asignStudentName";
        const res = await api.request(url, "POST", { id_usuario: id_alumno });
        const nombreCompleto = res.user.nombre + ' ' + res.user.ap_p + ' ' + res.user.ap_m;
        return nombreCompleto
    }

    const deleteTesis = async (id, tema) => {
        if (confirm("Desea eliminar la tesis: " + tema)) {
            const url = "http:///localhost:3000/tesis/delete";
            const res = await api.request(url, "POST", { id: id });
            reqAll();

        }
    }

    const assignTesisStudent = async (id) => {
        setIdTesis(id);
        setVisibleAsignStudent(true);
    }


    const assignTesisProfesor = async (id) => {
        setIdTesis(id);
        setVisibleAsignProfesor(true);
    }

    const setIdTesisFuncion = (id) => {
        setIdTesis(id)
        console.log(id)
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
                            <Fragment key={tesis.id_tesis}>
                                <tr >
                                    <td>{tesis.tema}</td>
                                    <td>{tesis.id_alumno != 1 ? tesis.id_alumno : 'Sin asignar'}</td>
                                    <td>{tesis.id_alumno}</td>
                                    <td>
                                        <button onClick={() => setIdTesisFuncion(tesis.id_tesis)}>Detalles</button>
                                        <button onClick={() => deleteTesis(tesis.id_tesis, tesis.tema)} >Eliminar</button>
                                    </td>
                                </tr>
                                <tr  className='contenedor'><td >{idTesis == tesis.id_tesis ? <Detalles /> : false}</td></tr>
                                </Fragment>
                        )
                    })}

                </tbody>
            </table>

            {visibleCreateTesis && <Ventana componente={<CrearTesis />} setVisible={setVisibleCreateTesis} />}
            {visibleAsignStudent && <Ventana componente={<AsignarAlumno idTesis={idTesis} />} setVisible={setVisibleAsignStudent} />}
            {visibleAsignProfesor && <Ventana componente={<AsignarProfesor idTesis={idTesis} />} setVisible={setVisibleAsignProfesor} />}

        </div>
    )
}
