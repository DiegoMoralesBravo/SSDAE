import React from "react";
import { RevisionesProfesores } from "./RevisionesProfesores";
import { Ventana } from "../Ventana";
import { useState } from "react";
import { ListaHistorial } from "./ListaHistorial";
import { useApi } from "../../hooks/useApi";

export const Profesor = ({ tesisByMaestroState }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const api = useApi();

  const evaluaciones = async (avance) => {
    console.log(avance);
    let url = "http:///localhost:3000/historial/alumnosEvaluaciones";

    try {
      let res = await api.request(url, "POST", avance);
      setData(res.evaluacion);
    } catch (error) {
      console.log(error);
    }
    setVisible(true);
  };

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

            {tesis.tesis.avances.length != 0 ? (tesis.tesis.avances.map((elemento, key) => {
              console.log('asdasd')
              console.log(elemento)

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
                    </ul>
                  </div>

                  {elemento.evaluacion.length != 0 ? (<button
                    className="mas-info"
                    onClick={() => evaluaciones(elemento)}
                  >
                    Evaluacion
                  </button>):(<h1 className="espacioIzq" >Sin evaluaciones</h1>) }
                  


                </div>
              );
            })): <h1 className="centrarText">No hay avances</h1>}
  
          </section>
        </article>
        {visible && (
          <Ventana
            componente={<ListaHistorial data={data} />}
            setVisible={setVisible}
          />
        )}
      </div>
    );
  });
};
