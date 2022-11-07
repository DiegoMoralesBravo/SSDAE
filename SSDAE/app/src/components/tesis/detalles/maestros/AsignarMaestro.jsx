import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { AsignadoMaestro } from './AsignadoMaestro';

export const AsignarMaestro = ({ idTesis }) => {

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
    const url = "http:///localhost:3000/tesis/fillTableTeacher";
    const res = await api.request(url, "POST", {id_tesis: idTesis});
    console.log(res)
    setTableInfo(res.profesores)
  }

  useEffect(() => {
    reqAll();
  }, [])


  const asignarMaestro = async (profesorId, name) => {

    if (confirm("¿Desea asignar el profesor: " + name)) {
        const url = "http:///localhost:3000/tesis/asignTeacher";
        const res = await api.request(url, "POST", {id_usuario: profesorId, id_tesis: idTesis});
        console.log(res)
        reqAll();
      }
}


  return (
    <div >
      <div className='header'>
        <p>PROFESORES</p>
        <div className='buttons'>
          <input type='text' placeholder='Buscar profesor...' onChange={searchUser} value={search} ></input>
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
            const nombre = user.usuarios.nombre + ' ' + user.usuarios.ap_p + ' ' + user.usuarios.ap_m;
            console.log(user)
            return (
              <tr key={user.id_profesor} >
                <td>{nombre}</td>
                <td>{user.usuarios.correo}</td>
                <td>
                  <button onClick={() => asignarMaestro(user.id_profesor, nombre) } >Anadir</button>
                </td>
              </tr>
            );
          })}


        </tbody>
      </table>

      <AsignadoMaestro idTesis={idTesis} />
    </div>
  )
}
