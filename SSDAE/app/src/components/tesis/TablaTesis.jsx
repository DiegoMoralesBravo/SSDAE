import React from 'react'
import { Ventana } from '../Ventana';
import { AsignarAlumno } from './AsignarAlumno';
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { CrearTesis } from './CrearTesis';
import { useLayoutEffect } from 'react';

export const TablaTesis = () => {


    const [tableInfo, setTableInfo] = useState([]);
    const [tableInfoName, setTableInfoName] = useState([]);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(false);
    const [visibleCreateTesis, setVisibleCreateTesis] = useState(false);
    const [visibleAsignStudent, setVisibleAsignStudent] = useState(false);
    const [idTesis, setIdTesis] = useState();
    const api = useApi();


    useLayoutEffect(() => {
        console.log('Al cargar')

        reqAll();
    }, [, visibleCreateTesis])

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
        const resJson = JSON.parse(res);
       
        resJson.map(async usuario => {
            setTableInfoName(reqName(usuario.id_alumno))
            usuario.nombreCompleto = tableInfoName;
        })
        console.log('Informacion a revisar')
        console.log(resJson)
        setTableInfo(resJson)
    }

    const reqName = async (id_alumno) => {
        console.log('Prueba')
        const url = "http:///localhost:3000/tesis/asignStudentName";
        const res = await api.request(url, "POST", { id_usuario: id_alumno });
        console.log(res)
        const nombreCompleto = res.user.nombre + ' ' +res.user.ap_p + ' ' +res.user.ap_m;
        console.log(nombreCompleto)
        return nombreCompleto
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

    const assignTesis = async (id) => {
        setIdTesis(id);
        setVisibleAsignStudent(true);
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
                        <th><strong>ID</strong></th>
                        <th><strong>Tema</strong></th>
                        <th><strong>Descripcion</strong></th>
                        <th><strong>Alumno</strong></th>
                        <th><strong>Acciones</strong></th>
                    </tr>

                    {tableInfo.map(tesis => {
                        console.log('Nombre completo')
                        console.log(tesis.nombreCompleto)
                        return (

                            <tr key={tesis.id_tesis} >
                                <td>{tesis.id_tesis}</td>
                                <td>{tesis.tema}</td>
                                <td>{tesis.descripcion}</td>
                                <td>{tesis.id_alumno != 1 ? tesis.nombreCompleto : 'Sin asignar'}</td>
                                <td>
                                    <button onClick={() => assignTesis(tesis.id_tesis)} >Asignar alumno</button>
                                    <button onClick={() => deleteTesis(tesis.id_tesis, tesis.tema)} >Eliminar</button>
                                </td>
                            </tr>


                        );
                    })}

                </tbody>
            </table>

            {visibleCreateTesis && <Ventana componente={<CrearTesis />} setVisible={setVisibleCreateTesis} />}
            {visibleAsignStudent && <Ventana componente={<AsignarAlumno idTesis={idTesis} />} setVisible={setVisibleAsignStudent} />}


        </div>
    )
}
