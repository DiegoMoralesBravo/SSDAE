import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Asignado } from './alumno/Asignado';
import { NoAsignado } from './alumno/NoAsignado';

export const VistaDetalles = ({ vista, dataTesis }) => {

  const [vistaVentana, setVistaVentana] = useState()

  useEffect(() => {
    console.log(dataTesis)

    switch (vista) {
      case 'descripcion':
        setVistaVentana(<div><p><strong>Descripcion:</strong></p> <p>{dataTesis.descripcion}</p></div> )
        break;

      case 'alumno':
        setVistaVentana(<div>{
            dataTesis.id_alumno == 1 ? 

            <NoAsignado dataTesis={dataTesis} />

            : 

            <Asignado dataTesis={dataTesis} />
          }
          </div>)
        break;

      case 'maestros':
        setVistaVentana(<p>Maestros</p>)
        break;

      default:

        break;
    }

  }, [, vista])



  return (
    vistaVentana
  )
}
