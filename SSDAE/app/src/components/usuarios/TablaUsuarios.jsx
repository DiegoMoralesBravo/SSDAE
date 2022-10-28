import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { Ventana } from '../Ventana';
import { CrearUsuarios } from './CrearUsuarios';
import { EditarUsuarios } from './EditarUsuarios';


export const TablaUsuarios = () => {

  const [tableInfo, setTableInfo] = useState([]);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(false);
  const [visibleEditUser, setVisibleEditUser] = useState(false)
  const [visibleCreateUser, setVisibleCreateUser] = useState(false)
  const [userInfo, setUserInfo] = useState();
  const api = useApi();



  const searchUser = (e) => {

    setSearch(e.target.value);
    let userFound = tableInfo.filter(user => {
      const nombre = user.nombre + ' ' + user.ap_p + ' ' + user.ap_m;
      return nombre.toLowerCase().includes(search.toLowerCase());
    })

    if (search.length <= 1 || userFound <= 0) {
      console.log('Pido todo')
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
    console.log('ENTREEE')
    const url = "http:///localhost:3000/usuario/fillTable";
    const res = await api.request(url, "GET");
    setTableInfo(JSON.parse(res))
  }

  const deleteUser = async (id, name) => {
    if (confirm("Desea eliminar el usuario: " + name)) {
      const url = "http:///localhost:3000/usuario/delete";
      const res = await api.request(url, "POST", { id: id });
      reqAll();

    } else {
      console.log('no')
    }

    console.log(id)
  }

  useEffect(() => {
    console.log('Al cargar')

    reqAll();

  }, [, visibleCreateUser, visibleEditUser])



  const editUser = (userData) => {
    setUserInfo(userData);
    setVisibleEditUser(true);
  }


  return (
    <div className='container-table'>

      <div className='header'>
        <p>USUARIOS</p>
        <div className='buttons'>

          <button onClick={() => setVisibleCreateUser(true)} >Crear Usuario</button>
          <input type='text' placeholder='Buscar usuario...' onChange={searchUser} value={search} ></input>


        </div>
      </div>

      {(result == true && search.length > 2) && <p>No se encontro ningun usuario: <strong style={{ color: "red" }}>{search}</strong></p>}

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

            const nombre = user.nombre + ' ' + user.ap_p + ' ' + user.ap_m;
            return (

              <tr key={user.id_usuario} >
                <td>{nombre}</td>
                <td>{user.id_usuario}</td>
                <td>{user.correo}</td>
                <td>{user.tipo_usuario}</td>
                <td>
                  <button onClick={() => editUser(user)}>Editar</button>
                </td>
                <td>
                  <button onClick={() => deleteUser(user.id_usuario, nombre)} >Eliminar</button>
                </td>
              </tr>


            );
          })}

        </tbody>
      </table>
      {visibleEditUser && <Ventana componente={<EditarUsuarios dataUser={userInfo} />} setVisible={setVisibleEditUser} />}
      {visibleCreateUser && <Ventana componente={<CrearUsuarios />} setVisible={setVisibleCreateUser} />}

    </div>


  )
}
