import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi';

export const AsignadoMaestro = ({ idTesis, flagCambio, setFlagCambio }) => {

  const api = useApi();
  const [tableInfo, setTableInfo] = useState([]);
  const [rol, setRol] = useState(0);
  const [director, setDirector] = useState('');

  const [selectRol, setSelectRol] = useState(['Sin rol', 'Director', 'Codirector', 'Observador']);

  const reqAll = async () => {
    const url = "http:///localhost:3000/tesis/fillTableProf_tesis";
    const res = await api.request(url, "POST", { id_tesis: idTesis });
    setTableInfo(res.prof_tesis)
  }

  useEffect(() => {
    reqAll();
  }, [, flagCambio])

  useEffect(() => {
    if (director) {
      console.log('Igual')
    } else {
      console.log('Diferente')
    }
  }, [director])


  const desasignarMaestro = async (id_profesor, nombre) => {
    if (confirm("¿Desea desasignar el profesor: " + nombre)) {
      const url = "http:///localhost:3000/tesis/unsignTeacher";
      const res = await api.request(url, "POST", { id_profesor: id_profesor, id_tesis: idTesis });
      reqAll();
      setFlagCambio(flagCambio + 1)
    }
  };

  const asignarRoles = () => {
    setRol(1);
  }

  const guardarRoles = () => {
    setRol(0);
    reqAll();
  }


  const rolCheck = async (e, id_profesor) => {
    console.log('Cambio en el selector')
    console.log(e.target.value)
    console.log(id_profesor)
    if (director == id_profesor && e.target.value != 'Director') {
      setDirector('');
    }
    if (e.target.value == 'Director') {
      setDirector(id_profesor)
    }
    const url = "http:///localhost:3000/tesis/rolTeacher";
    const res = await api.request(url, "POST", { id_profesor: id_profesor, id_tesis: idTesis, rol: e.target.value });
    console.log(res)
  }

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
            <th><strong>Acciones</strong></th>
          </tr>

          {tableInfo.map(user => {
            const nombre = user.profesores.usuarios.nombre + ' ' + user.profesores.usuarios.ap_p;

            return (
              <tr key={user.id_profesor}>
                <td>{nombre}</td>
                <td>{user.profesores.usuarios.correo}</td>
                <td>{user.profesores.interno_externo}</td>
                <td>

                  {rol ?
                    <select onChange={(e) => rolCheck(e, user.id_profesor)}>

                      <option>{user.rol}</option>
                      
                      {selectRol.map(rol => {

                        if (user.rol == rol) {
                          return ('');
                        }

                        if (director != user.id_profesor) {
                          if (rol == 'Director' && director) {
                            return ('');
                          }
                        }
                        return (<option key={rol + nombre}>{rol}</option>)
                      })}

                    </select> : user.rol}
                </td>

                <td>
                  {!rol && <button onClick={() => desasignarMaestro(user.id_profesor, nombre)} >Quitar</button>}
                </td>

              </tr>
            );
          })}

        </tbody>
      </table>
      <div className='contenedor-boton-negro'>
        {rol ? <button className="boton-negro" onClick={guardarRoles} > Guardar roles </button> : <button className="boton-negro" onClick={asignarRoles} > Asignar roles </button>}
      </div>

    </div>
  )
}
