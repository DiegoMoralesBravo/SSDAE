import React from 'react'
import { Navbar } from './Navbar'
import { VistaDetalles } from './VistaDetalles'

export const Detalles = () => {
  return (
    <div className="contenedor" >
      <Navbar />
      <div>
        <VistaDetalles />
      </div>
    </div>

  )
}
