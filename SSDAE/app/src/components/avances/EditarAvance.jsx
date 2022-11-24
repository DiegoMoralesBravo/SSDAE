import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export const EditarAvance = ({setChangeFile, dowloadPath, setBandera, bandera}) => {

  useEffect(()=>{
    console.log('Se monta editar')

    console.log(dowloadPath)
  },[])

  const changeFile = (e) => {
    setChangeFile(e.target.files[0])
  }

  return (
    <div>
      <h3 className='alerta-avance'>Archivo: OK!</h3>
      <label htmlFor="file-upload" className="custom-file-upload">
        Cambiar archivo
      </label>
      <input onChange={changeFile} name='file' id="file-upload" type="file" />

      <a href={dowloadPath} download><button>Descargar archivo</button></a>
    </div>
  )
}
