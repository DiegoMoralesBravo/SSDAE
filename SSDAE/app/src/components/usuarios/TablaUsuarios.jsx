import React from 'react'
import { NavLink } from 'react-router-dom';

export const TablaUsuarios = () => {
    return (
        <div id="apptable">
  <div class="container">
    <div class="page-header">
      <div class="title">
        <h1 id="page-title">Usuarios</h1>
      </div>

      <nav class="menu">
        
      </nav>

      <div class="search">
        <form id="search-product-form" action="#" method="post">
          <div class="input-group">
            <input type="text" value="" name="keywords" class="form-control product-search-keywords" placeholder="Buscar usuario..."/>

          </div>
        </form>
      </div>
    </div>

    <div id="page-content">
      <table class="table">
        <tbody>
          <tr>
            <th>Nombre</th>
            <th>ID</th>
            <th>Correo</th>
            <th>Tipo de usuario</th>
            <th>Acciones</th>
          </tr>

          <tr>
            <td>Diego Alejandro Morales Bravo</td>
            <td>1</td>
            <td>Diego@gmail.com</td>
            <td>Alumno</td>
            <td>
              <button >Editar</button>
              <button >Eliminar</button>
            </td>
          </tr>

          <tr>
            <td>Diego Alejandro Morales Bravo</td>
            <td>1</td>
            <td>Diego@gmail.com</td>
            <td>Alumno</td>
            <td>
              <button >Editar</button>
              <button >Eliminar</button>
            </td>
          </tr>


          <tr>
            <td>Diego Alejandro Morales Bravo</td>
            <td>1</td>
            <td>Diego@gmail.com</td>
            <td>Alumno</td>
            <td>
              <button >Editar</button>
              <button >Eliminar</button>
            </td>
          </tr>


          <tr>
            <td>Diego Alejandro Morales Bravo</td>
            <td>1</td>
            <td>Diego@gmail.com</td>
            <td>Alumno</td>
            <td>
              <button >Editar</button>
              <button >Eliminar</button>
            </td>
          </tr>


          <tr>
            <td>Diego Alejandro Morales Bravo</td>
            <td>1</td>
            <td>Diego@gmail.com</td>
            <td>Alumno</td>
            <td>
              <button >Editar</button>
              <button >Eliminar</button>
            </td>
          </tr>

        </tbody>
      </table>

    </div>
  </div>
  <button><NavLink to="/CrearUsuario"> Crear usuario </NavLink> </button>
</div>
    )
}
