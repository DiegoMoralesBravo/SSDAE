import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi';

export const AsignadoMaestro = ({idTesis}) => {

  const api = useApi();
  const [tableInfo, setTableInfo] = useState([]);


  const reqAll = async () => {

    const url = "http:///localhost:3000/tesis/fillTableProf_tesis";

    const res = await api.request(url, "POST", {id_tesis: idTesis});
    console.log(res.prof_tesis)

    setTableInfo(res.prof_tesis)
  }

  useEffect(() => {
    reqAll();
  }, [])


  return (
    <div>
      <div className='header'>
      <p>ROLES</p>
    </div>
      <table>
        <tbody className='tabla'>
          <tr>
            <th><strong>Nombre</strong></th>
            <th><strong>Correo</strong></th>
            <th><strong>Int/Ext</strong></th>
            <th><strong>Rol</strong></th>
          </tr>

          {tableInfo.map(user => {
             const nombre = user.profesores.usuarios.nombre + ' ' + user.profesores.usuarios.ap_p;
            //  const nombre = user.profesores.usuarios.nombre + ' ' + user.profesores.usuarios.ap_p + ' ' + user.profesores.usuarios.ap_m;

            return (
              <tr key={user.id_profesor}>
                <td>{nombre}</td>
                <td>{user.profesores.usuarios.correo}</td>
                <td>{user.profesores.interno_externo}</td>
                <td>{user.rol}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
      </div>
  )
}
