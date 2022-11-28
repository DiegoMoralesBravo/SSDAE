import React from "react";
import { Ventana } from "../Ventana";
import { useState } from "react";
import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { Formulario } from "./Formulario";

export const Evaluacion = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [avance, setAvance] = useState({});
  const api = useApi();
  const { user } = useContext(loginContext);

  useEffect(() => {
    const getData = async () => {
      let url = "http:///localhost:3000/evaluacion/check";
      try {
        let res = await api.request(url, "POST", user);
        console.log(res);
        if (res.tesisByProf.length) {
          console.log("Si tiene informacion");
          setData(res.tesisByProf);
        } else {
          //AQUI PONER UNA VISTA DE QUE NO HAY INFORMACION
          console.log("No tiene informacion");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [, visible]);

  const form = (avance) => {
    console.log(avance);
    setAvance(avance);
    setVisible(true);
  };

  return (
    <>
     {data != 0 ? (data.map((tesis, key) => {
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
                  return (
                    <div key={elemento.numero_avance} className="revision-bar">
                      <div className="links-bar">
                        <h3>{elemento.numero_avance}</h3>
                        <ul>
                          <li>
                            <a>No. Avance</a>
                          </li>
                          <li>
                            <a
                              href={"/public/avances/" + elemento.doc}
                              download
                            >
                              <span>Descargar archivo</span>
                            </a>
                          </li>
                          <li>
                            <a>
                              {elemento.evaluacion.length == 1
                                ? "Ya fue revisado!"
                                : "Sin revisar"}
                            </a>
                          </li>
                        </ul>
                      </div>

                      {elemento.evaluacion.length == 1 ? (
                        ""
                      ) : (
                        <button
                          className="mas-info"
                          onClick={() => form(elemento)}
                        >
                          Calificar
                        </button>
                      )}
                    </div>
                  );
                }))
                : (<h1 className="textoCentrar">Sin avances!</h1>)}


              </section>
            </article>
          </div>
        );
      })) : (<h1 className="textoCentrar">Sin tema asignado como observador!</h1>)}
   

      {visible && (
        <Ventana
          componente={<Formulario avance={avance} setVisible={setVisible} />}
          setVisible={setVisible}
        />
      )}
    </>
  );
};
