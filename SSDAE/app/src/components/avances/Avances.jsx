import React from 'react'
import { useState } from 'react';
import { useApi } from '../../hooks/useApi'

const multer = require('multer');

const upload = multer();

export const Avances = () => {
  const api = useApi();

  const [file, setFile] = useState(null);

  const saveFile = (e) => {
    e.preventDefault();
    setFile(e.target.files);
    console.log(e.target.files)
  }

  const sendFile = async (e) => {
    e.preventDefault();
    console.log('Enviare el archivo')


    var formData = new FormData();

    formData.append("userfile", file[0]);


    console.log(formData)
    let url = "http:///localhost:3000/avances/saveFile";

    let res = await api.request(url, "POST", formData);

    console.log(res)
    console.log('Archivo enviado');
  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={sendFile} >

          <input type="file" placeholder="Correo electronico" onChange={saveFile} required />

          <p style={{ display: 'none' }} >*Usuario y/o contraseña incorrectos</p>

          <button>Subir archivo</button>
        </form>
      </div>
    </div>
  )
}