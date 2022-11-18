import React from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { loginContext } from '../../context/loginContext';
import { useApi } from '../../hooks/useApi'

export const Avances = () => {
  const api = useApi();
  const alert = useRef();
  const formulario = useRef();

  const {user} = useContext(loginContext);
  

  const [file, setFile] = useState(null);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  }

  const sendFile = async (e) => {
    e.preventDefault();
    console.log('Enviare el archivo')

    var formData = new FormData();

    console.log(user)

    formData.append("file", file);
    formData.append("user", JSON.stringify(user));


    let url = "http:///localhost:3000/avances/saveFile";

    let res = await api.request(url, "POST", formData, true);

    if (res.mensaje == 'Archivo guardado') {
      console.log('Archivo guardado')
    } else {
      alert.current.style.display = 'block';
      alert.current.innerText = '*Solo archivos comprimidos'
    }

    formulario.current.reset();
  }



  return (
    <div className="login-page">

      <div className="form">
        <div className='encabezado-avances'>
          <p>Buzon para subir avances</p>
          <p>Estatus: ACTIVO</p>
        </div>


        <form className="login-form" ref={formulario} onSubmit={sendFile} >

          <input type="file" placeholder="Correo electronico" name='file' onChange={saveFile} required />

          <p ref={alert} style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>

          <button>Subir archivo</button>
        </form>
      </div>
    </div>
  )
}