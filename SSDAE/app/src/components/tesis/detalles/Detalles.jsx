import React from 'react'
import { useState } from 'react'
import { VistaDetalles } from './VistaDetalles'

export const Detalles = ({ dataTesis }) => {

  const [vista, setVista] = useState('descripcion')

  const [alumnoAsignado, setAlumnoAsignado] = useState(dataTesis.id_alumno);
  //const [maestroAsignado, setMaestroAsignado] = useState(dataTesis.id_alumno);

  return (

    <div>
      <div className='contenedor-titulo'>
        <strong><p>{'TEMA: ' + dataTesis.tema.toUpperCase()}</p></strong>
      </div>
      <div className="contenedor-contenido" >
        <div className="nav-detalles">
          <nav>
            <ul className="nav-list-detalles">
              <li onClick={() => { setVista('descripcion') }} ><a>Descripcion</a></li>
              <li onClick={() => { setVista('alumno') }} ><a>Alumno</a></li>
              <li onClick={() => { setVista('maestros') }} ><a>Maestros</a></li>
            </ul>
          </nav>
        </div>
        
          <VistaDetalles dataTesis={dataTesis} vista={vista} alumnoAsignado={alumnoAsignado} setAlumnoAsignado={setAlumnoAsignado}/>
    
      </div>
    </div>
  )
}
