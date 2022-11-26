import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useApi } from "../../../../hooks/useApi";

export const AsignadoAlumno = ({
  dataTesis,
  setAlumnoAsignado,
  alumnoAsignado,
}) => {
  const api = useApi();
  const [name, setName] = useState();
  const [correo, setCorreo] = useState();

  const desasignar = async () => {
    if (confirm("¿Desea desasignar el estudiante?")) {
      const url = "http:///localhost:3000/tesis/asignStudent";
      try {
        const res = await api.request(url, "POST", {
          id_tesis: dataTesis.id,
          id_usuario: 1,
        });
        setAlumnoAsignado(1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const reqName = async () => {
      const url = "http:///localhost:3000/tesis/asignStudentName";
      try {
        const res = await api.request(url, "POST", {
          id_usuario: alumnoAsignado,
        });
        setName(res.user.nombre + " " + res.user.ap_p + " " + res.user.ap_m);
        setCorreo(res.user.correo);
      } catch (error) {
        console.log(error);
      }
    };
    reqName();
  }, []);

  return (
    <div>
      <p>
        <strong>Alumno asignado:</strong>
      </p>
      <p>{name}</p>
      <br></br>
      <p>
        <strong>Correo:</strong>
      </p>
      <p>{correo}</p>
      <br></br>

      <button onClick={desasignar}>Desasignar</button>
    </div>
  );
};
