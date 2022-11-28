import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Ventana } from "../Ventana";
import { ListaHistorial } from "./ListaHistorial";
import { useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { useApi } from "../../hooks/useApi";
import { Alumno } from "./Alumno";
import { Profesor } from "./Profesor";

export const Historial = () => {
  const [cargando, setCargando] = useState(true);
  const [tesisState, setTesis] = useState([]);
  const [profTesis, setProftesis] = useState([]);
  const [profesorState, setProfesorState] = useState([]);
  const [tesisByMaestroState, setTesisByMaestro] = useState([]);
  const [avancesState, setAvances] = useState([]);
  const [avancesProfState, setAvancesProf] = useState([]);

  const { user } = useContext(loginContext);
  const api = useApi();

  useEffect(() => {
    if (user.tipo_usuario == "alumno") {
      getData();
    }
    if (user.tipo_usuario == "maestro") {
      getDataToProfesores();
    }
  }, []);

  const getDataToProfesores = async () => {
    let url = "http:///localhost:3000/historial/profesores";
    try {
      let res = await api.request(url, "POST", user);
      if (res.mensaje == "succes") {
        setTesisByMaestro(res.tesisByProf);
      }

      setCargando(false);

      const maestros = tesisByMaestroState.map(
        (element) => element.tesis.avances
      );
      setAvancesProf(maestros);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    let url = "http:///localhost:3000/historial/alumnos";

    try {
      let res = await api.request(url, "POST", user);

      if (res.mensaje == "succes") {
        setTesis(res.tesis);
        setProfesorState(res.nombreDirector);
        setAvances(res.avances);
        setProftesis(res.prof_tesis)
      }
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {cargando ? (
        "Cargando informacion..."
      ) : tesisState.length >= 1 && user.tipo_usuario == "alumno" ? (
        <Alumno
          tesisState={tesisState}
          profesorState={profesorState}
          user={user}
          avancesState={avancesState}
          profTesis={profTesis}
        />
      ) : (
        <Profesor
          tesisByMaestroState={tesisByMaestroState}
          avancesProfState={avancesProfState}
        />
      )}
    </>
  );
};
