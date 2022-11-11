import React from 'react'
import { useState } from 'react';
import { useApi } from '../../hooks/useApi'



export const Avances = () => {
  const api = useApi();

  const [file, setFile] = useState(null);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const sendFile = async (e) => {
    e.preventDefault();
    console.log('Enviare el archivo')

    var formData = new FormData();

    formData.append("file", file);

    console.log(formData)
    console.log('Impresion de .file')
    console.log(formData.file)

    let url = "http:///localhost:3000/avances/saveFile";

    let res = await api.request(url, "POST", formData, true);

    console.log(res)
    console.log('Archivo enviado');
  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={sendFile} >

          <input type="file" placeholder="Correo electronico" name='file' onChange={saveFile} required />

          <p style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>

          <button>Subir archivo</button>
        </form>
      </div>
    </div>
  )
}