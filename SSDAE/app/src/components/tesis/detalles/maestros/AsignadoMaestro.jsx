import React from 'react'

export const AsignadoMaestro = () => {
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
            <th><strong>Rol</strong></th>
          </tr>

          {/* {tableInfo.map(user => {
            const nombre = user.nombre + ' ' + user.ap_p + ' ' + user.ap_m;
            return (
              <tr key={user.id_usuario} >
                <td>{nombre}</td>
                <td>{user.correo}</td>
                <td>
                  <button>Anadir</button>
                </td>
              </tr>
            );
          })} */}

        </tbody>
      </table>
      </div>
  )
}
