import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi'

export const Asignado = ({ dataTesis, setAlumnoAsignado, alumnoAsignado }) => {

  const api = useApi();
  const [name, setName] = useState()


  const desasignar = async () => {
    if (confirm("¿Desea desasignar el estudiante?" )) {
      const url = "http:///localhost:3000/tesis/asignStudent";
      const res = await api.request(url, "POST", { id_tesis: dataTesis.id, id_usuario: 1 });
      setAlumnoAsignado(1)
    }
  }

  useEffect(() => {

    const reqName = async() => {
      const url = "http:///localhost:3000/tesis/asignStudentName";
      const res = await api.request(url, "POST", { id_usuario: alumnoAsignado });
      console.log(res)
      setName(res.user.nombre +' '+res.user.ap_p + ' ' + res.user.ap_m)
    }

    reqName()
    



  }, [])

  return (
    <div>
      <p><strong>Alumno asignado:</strong></p>
      <p>{name}</p><br></br>

      <button onClick={desasignar}>Desasignar</button>
    </div>
  )
}
