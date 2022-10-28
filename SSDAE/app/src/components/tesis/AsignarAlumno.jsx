import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';


export const AsignarAlumno = ({ idTesis }) => {

    const [tableInfo, setTableInfo] = useState([]);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(false);
    const api = useApi();


    const searchUser = (e) => {
        setSearch(e.target.value);
        let userFound = tableInfo.filter(user => {
            const nombre = user.nombre + ' ' + user.ap_p + ' ' + user.ap_m;
            return nombre.toLowerCase().includes(search.toLowerCase());
        })
        if (search.length <= 1 || userFound <= 0) {
            reqAll();
            setResult(true);
        }
        else {
            setTableInfo(userFound);
            setResult(false);
            console.log(userFound)
        }
    }

    const reqAll = async () => {
        const url = "http:///localhost:3000/usuario/fillTable";
        const res = await api.request(url, "GET");
        setTableInfo(JSON.parse(res))
    }

    useEffect(() => {
        reqAll();
    }, [])

    const asignarStudent = async (studentId, name) => {
        console.log(studentId)
        if (confirm("¿Desea asignar el estudiante: " + name)) {
            const url = "http:///localhost:3000/tesis/asignStudent";
            const res = await api.request(url, "POST", {id_alumno: studentId, id_tesis: idTesis});
            reqAll();
      
          }
    }

    return (
        <div className='container-table'>
            <div className='header'>
                <p>USUARIOS</p>
                <div className='buttons'>
                    <input type='text' placeholder='Buscar usuario...' onChange={searchUser} value={search} ></input>
                </div>
            </div>
            {(result == true && search.length > 2) && <p>No se encontro ningun usuario: <strong style={{ color: "red" }}>{search}</strong></p>}
            <table>
                <tbody className='tabla'>
                    <tr>
                        <th><strong>Nombre</strong></th>
                        <th><strong>Correo</strong></th>
                    </tr>

                    {tableInfo.map(user => {
                        const nombre = user.nombre + ' ' + user.ap_p + ' ' + user.ap_m;
                        return (
                            <tr key={user.id_usuario} >
                                <td>{nombre}</td>
                                <td>{user.correo}</td>
                                <td>
                                    <button onClick={() => asignarStudent(user.id_usuario, nombre)}>Asignar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
