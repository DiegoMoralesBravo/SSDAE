import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Asignado } from './alumno/Asignado';
import { AsignarAlumno } from './alumno/AsignarAlumno';
import { useApi } from './../../../hooks/useApi'

export const VistaDetalles = ({ vista, dataTesis, alumnoAsignado, setAlumnoAsignado }) => {

  const [vistaVentana, setVistaVentana] = useState()

  const api = useApi();



  useEffect(() => {
    console.log('Cambio')

  

    switch (vista) {
      case 'descripcion':
        setVistaVentana(<div><p><strong>Descripcion:</strong></p> <p>{dataTesis.descripcion}</p></div> )
        break;

      case 'alumno':
        setVistaVentana(<div>{

            alumnoAsignado == 1 ? 

            <AsignarAlumno idTesis={dataTesis.id} setAlumnoAsignado={setAlumnoAsignado} alumnoAsignado={alumnoAsignado} />

            : 

            <Asignado dataTesis={dataTesis} setAlumnoAsignado={setAlumnoAsignado} alumnoAsignado={alumnoAsignado} />
            
          }
          </div>)
        break;

      case 'maestros':
        setVistaVentana(<p>Maestros</p>)
        break;

      default:

        break;
    }

  }, [, vista, alumnoAsignado])



  const idCheck = async () => {
    console.log('desasignar')

    const url = "http:///localhost:3000/tesis/validation";
    const res = await api.request(url, "POST", { id_tesis: dataTesis.id });
    setIdAlumno(res.id)

    console.log(res.id)
}



  return (
    vistaVentana
  )
}
