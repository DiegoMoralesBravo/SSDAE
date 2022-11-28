import React from "react";
import { RevisionesProfesores } from "./RevisionesProfesores";
import { Ventana } from "../Ventana";
import { useState } from "react";
import { ListaHistorial } from "./ListaHistorial";

export const Profesor = ({ tesisByMaestroState }) => {
    const [visible, setVisible] = useState(false);
  return tesisByMaestroState.map((tesis, key) => {
    return (
      <div key={tesis.id_tesis} className="historial-container">
        <article className="articulo-item">
          <section className="header-card">
            <div className="datos-alumno">
              <h2>
                <span className="span-avance">Tema: </span>
                {tesis.tesis.tema}
              </h2>
              <h2>
                <span className="span-avance">Nombre del alumno: </span>
                {tesis.tesis.alumnos.usuarios.nombre}
              </h2>

                {tesis.tesis.prof_tesis.map((profesor, key) => {
                  return (
                    <h2 key={profesor.profesores.id_profesor}>
                    <span className="span-avance"> Nombre: </span>
                    {profesor.profesores.usuarios.nombre}
                    <span className="span-avance"> Rol: </span>
                    {profesor.rol}
                    </h2>
                    
                  );
                })}
              
            </div>
          </section>

          <section className="revisiones">
            {tesis.tesis.avances.map((elemento, key) => {
              return (
                <div key={elemento.numero_avance} className="revision-bar">
                  <div className="links-bar">
                    <h3>{elemento.numero_avance}</h3>
                    <ul>
                      <li>
                        <a>No. Avance</a>
                      </li>
                      <li>
                        <a href={"/public/avances/" + elemento.doc} download>
                          <span>Descargar archivo</span>
                        </a>
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
    );
  });
};
