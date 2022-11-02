import React from 'react'
import { useApi } from '../../../../hooks/useApi'

export const Asignado = ({dataTesis}) => {

    const api = useApi();
    console.log(dataTesis)

    const  desasignar = async () => {
        console.log('desasignar')

        const url = "http:///localhost:3000/tesis/asignStudent";
        const res = await api.request(url, "POST", { id_tesis: dataTesis.id , id_usuario: 1 });

        console.log(res)
    }

  return (
    <div>
        <p><strong>Alumno asignado:</strong></p>
        <p>Diego Morales</p><br></br>
       
        <button onClick={desasignar}>Desasignar</button>
    </div>
  )
}
