import React from "react";
import { Ventana } from "../Ventana";
import { useState } from "react";
import { ListaHistorial } from "./ListaHistorial";
import { useApi } from "../../hooks/useApi";

export const Alumno = ({
  tesisState,
  profesorState,
  user,
  avancesState,
  profTesis,
}) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const api = useApi();

  const evaluaciones = async (avance) => {
    console.log(avance);
    let url = "http:///localhost:3000/historial/alumnosEvaluaciones";

    try {
      let res = await api.request(url, "POST", avance);
      setData(res.evaluacion)
    } catch (error) {
      console.log(error);
    }
    setVisible(true);
  };

  return (
    <div>
      <div className="historial-container">
        <article className="articulo-item">
          <section className="header-card">
            <div className="datos-alumno">
              <h2>
                <span className="span-avance">Tema: </span>
                {tesisState[0].tema}
              </h2>
              {profTesis.map((profesor, key) => {
                return (
                  <h2 key={profesor.profesores.usuarios.nombre}>
                    <span className="span-avance"> Nombre: </span>
                    {profesor.profesores.usuarios.nombre}
                    <span className="span-avance"> Rol: </span>
                    {profesor.rol}
                  </h2>
                );
              })}
              <h2>
                <span className="span-avance">Nombre del alumno: </span>
                {user.nombre + " " + user.ap_p}{" "}
              </h2>
            </div>
          </section>

          <section className="revisiones">
            {avancesState.map((avance, key) => {
              return (
                <div key={key} className="revision-bar">
                  <div className="links-bar">
                    <h3>{avance.numero_avance}</h3>
                    <ul>
                      <li>
                        <a>Avance</a>
                      </li>
                      <li>
                        <a href={"/public/avances/" + avance.doc} download>
                          <span>Descargar archivo</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button
                    className="mas-info"
                    onClick={() => evaluaciones(avance)}
                  >
                    Evaluacion
                  </button>
                </div>
              );
            })}
          </section>
        </article>

        {visible && (
          <Ventana componente={<ListaHistorial data={data} />} setVisible={setVisible} />
        )}
      </div>
    </div>
  );
};
