import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

export const TablaUsuarios = () => {

  const [tableInfo, setTableInfo] = useState([]);
  const api = useApi();

  useEffect(() => {
    console.log('Al cargar')
    const req = async () => {
      console.log('ENTREEE')
      const url = "http:///localhost:3000/usuario/fillTable";
      const res = await api.request(url, "GET");
      console.log(JSON.parse(res))
      setTableInfo(JSON.parse(res))
    }

    req();
  }, [])



  return (
    <div className='container-table'>

      <div className='header'>
        <p>USUARIOS</p>
        <div className='buttons'>

          <button><NavLink className="boton" to="/CrearUsuario"> Crear usuario </NavLink></button>
          <input type='text' placeholder='Buscar usuario...'></input>

        </div>
      </div>

      <table>
        <tbody className='tabla'>
          <tr>
            <th><strong>Nombre</strong></th>
            <th><strong>ID</strong></th>
            <th><strong>Correo</strong></th>
            <th><strong>Tipo de usuario</strong></th>
            <th><strong>Acciones</strong></th>
          </tr>

          {tableInfo.map(user => {

            const nombre = user.nombre +' ' + user.ap_p+ ' ' + user.ap_m 
            return (
              
                <tr key={user.id_usuario} >
                  <td>{nombre}</td>
                  <td>{user.id_usuario}</td>
                  <td>{user.correo}</td>
                  <td>{user.tipo_usuario}</td>
                  <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </td>
                </tr>
     

            );
          })}

        </tbody>
      </table>

    </div>
  )
}
