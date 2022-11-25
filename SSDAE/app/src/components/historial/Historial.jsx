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
  const [visible, setVisible] = useState(false);
  const [tesisState, setTesis] = useState([]);
  const [profesorState, setProfesorState] = useState([]);
  const [tesisByMaestroState, setTesisByMaestro] = useState([]);

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

  useEffect(() => {

    console.log(tesisByMaestroState);

  }, [tesisState, profesorState,tesisByMaestroState]);

  const getDataToProfesores = async () => {
    let url = "http:///localhost:3000/historial/profesores";
    let res = await api.request(url, "POST", user);

    console.log("------------- aqui se resive la informacion ------------");
    console.log(res);

    if(res.mensaje == "succes"){

      console.log("entro al if de maestro");

      setTesisByMaestro(res.tesisByProf);

    }

    setCargando(false);
  };

  const getData = async () => {
    console.log("usuario logeado");
    console.log(user);

    let url = "http:///localhost:3000/historial/alumnos";
    let res = await api.request(url, "POST", user);

    console.log(res);
    console.log("informacion" + res.prof_tesis);

    if (res.mensaje == "succes") {
    
      setTesis(res.tesis);
      setProfesorState(res.nombreDirector);
    }

    setCargando(false);
  };

  return (
    <>
      {cargando ? (
        "Cargando informacion..."
      ) : (tesisState.length >= 1 && user.tipo_usuario == "alumno" )
      ? (<Alumno tesisState = {tesisState} profesorState = {profesorState} user = {user}/>) 
      
        :<Profesor tesisByMaestroState ={tesisByMaestroState}/>}
    </>
  );
};
