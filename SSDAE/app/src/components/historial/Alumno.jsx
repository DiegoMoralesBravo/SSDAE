import React from "react";
import { Ventana } from "../Ventana";
import { useState } from "react";
import { ListaHistorial } from "./ListaHistorial";

export const Alumno = ({ tesisState, profesorState, user, avancesState }) => {
  const [visible, setVisible] = useState(false);

  // {"Tema: " + profesorState}
  return (
    <div>
      <div className="historial-container">
        <article className="articulo-item">
          <section className="header-card">
            <div className="datos-alumno">
              <h2>
                <span>Tema: </span>
                {tesisState[0].tema}
              </h2>
              <h2>
                <span>Director: </span>
                {profesorState.nombre + " " + profesorState.ap_p}
              </h2>
              <h2>
                <span>Nombre del alumno: </span>
                {user.nombre + " " + user.ap_p}{" "}
              </h2>
            </div>
          </section>

          <section className="revisiones">
            {avancesState.map((avance, key) => {
              return (
                <div key ={key} className="revision-bar">
                  <div className="links-bar">
                    <h3>{avance.numero_avance}</h3>
                    <ul>
                      <li>
                        <a>Avance</a>
                      </li>
                      <li>
                      <a href= {'/public/avances/' + avance.doc} download><span>Descargar archivo</span></a>
                      </li>
                      <li>
                        <a>calificacion</a>
                      </li>
                    </ul>
                  </div>
                  <button className="mas-info" onClick={() => setVisible(true)}>
                    click
                  </button>
                </div>
              );
            })}
          </section>
        </article>

        {visible && (
          <Ventana componente={<ListaHistorial />} setVisible={setVisible} />
        )}
      </div>
    </div>
  );
};
