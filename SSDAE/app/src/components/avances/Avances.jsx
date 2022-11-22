import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { loginContext } from '../../context/loginContext';
import { useApi } from '../../hooks/useApi'

export const Avances = () => {
  const api = useApi();
  const alert = useRef();
  const formulario = useRef();
  const { user } = useContext(loginContext);
  const [file, setFile] = useState(null);
  const [tesis, setTesis] = useState(false);
  const [data, setData] = useState({});
  const [editar, setEditar] = useState(false);


  useEffect(() => {

    const checkAvances = async () => {
      let url = "http:///localhost:3000/avances/checkTesis";
      let res = await api.request(url, "POST", user);

      if (res.mensaje == 'No hay tesis asignada') {
        setTesis(false);
      } else {
        setTesis(true);
        setData(res)
      }

      console.log(res)

      res.avance.forEach(element => {
        console.log(element)
        if (element.revisado == 'sin revisar') {
          setEditar(true);
          setTesis(element);

        }
      });

    }
    checkAvances()
  }, [,]);


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
    formData.append("numeroAvance", data.avance.length + 1);


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

        {tesis ? <div>
          <div className='encabezado-avances'>
            <p className='centrar'>Buzon para subir avances</p>
            <p>Estatus: ACTIVO</p>

            <p>Tema: {data.tesis[0].tema}</p>


          </div>


          {editar ?
            
            <div>

              <h3 className='alerta-avance'>Archivo: OK!</h3>
              <label htmlFor="file-upload" className="custom-file-upload">
                 Cambiar archivo
              </label>

              <input id="file-upload" type="file" />

              <button>Descargar archivo</button>
            </div>

            :
            
            <form className="login-form" ref={formulario} onSubmit={sendFile} >
              <p>Archivo: Sin archivo</p>
              <input type="file" placeholder="Correo electronico" name='file' onChange={saveFile} required />
              <p ref={alert} style={{ display: 'none' }} ></p>
              <button>Subir archivo</button>
            </form>}



        </div> : <div className='encabezado-avances'>
          <p>No se tiene asignado ningun tema de tesis</p>
        </div>}


      </div>
    </div>
  )
}