import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AsignadoAlumno } from "./alumno/AsignadoAlumno";
import { AsignarAlumno } from "./alumno/AsignarAlumno";
import { useApi } from "./../../../hooks/useApi";
import { AsignarMaestro } from "./maestros/AsignarMaestro";

export const VistaDetalles = ({
  vista,
  dataTesis,
  alumnoAsignado,
  setAlumnoAsignado,
  flagCambio,
  setFlagCambio,
}) => {
  const [vistaVentana, setVistaVentana] = useState();

  const api = useApi();

  useEffect(() => {
    switch (vista) {
      case "descripcion":
        setVistaVentana(
          <div>
            <p>
              <strong>Descripcion:</strong>
            </p>{" "}
            <p>{dataTesis.descripcion}</p>
          </div>
        );
        break;

      case "alumno":
        setVistaVentana(
          <div>
            {alumnoAsignado == 1 ? (
              <AsignarAlumno
                idTesis={dataTesis.id}
                setAlumnoAsignado={setAlumnoAsignado}
                alumnoAsignado={alumnoAsignado}
              />
            ) : (
              <AsignadoAlumno
                dataTesis={dataTesis}
                setAlumnoAsignado={setAlumnoAsignado}
                alumnoAsignado={alumnoAsignado}
              />
            )}
          </div>
        );
        break;

      case "maestros":
        setVistaVentana(
          <div>
            {
              <AsignarMaestro
                idTesis={dataTesis.id}
                flagCambio={flagCambio}
                setFlagCambio={setFlagCambio}
              />
            }
          </div>
        );
        break;

      default:
        break;
    }
  }, [, vista, alumnoAsignado, flagCambio]);


  return vistaVentana;
};
