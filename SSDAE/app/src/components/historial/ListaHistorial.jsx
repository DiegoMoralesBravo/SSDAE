import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";

export const ListaHistorial = ({ data }) => {
  const api = useApi();

  const [comentarios, setCometarios] = useState(data[0]);

  useEffect(()=>{
    console.log(data)
  },[])

  const getComentarios = async (revisor) => {
    console.log("test");
    let url = "http:///localhost:3000/historial/getComentarios";
    try {
      let res = await api.request(url, "POST", revisor);
      console.log(res.comentarios);
      setCometarios(res.comentarios[0]);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  // }, []);

  return (
    <div className="login-page">
      <div className="form-revisiones">
        <div className="cabecera-revisiones">
          <ul>
            {data.map((revisor) => {
              return (
                <li key={revisor.profesores.usuarios.nombre} onClick={() => getComentarios(revisor)}>
                  <a>{"Revisor: " + revisor.profesores.usuarios.nombre} </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="revisiones-container">
          <section className="comentarios">
            <h3>Estructura y calidad del documento</h3>

            <p>{comentarios.campo1}</p>
          </section>

          <section className="comentarios">
            <h3>Amplitud y actualidad de la información utilizada</h3>
            <p>{comentarios.campo2}</p>
          </section>

          <section className="comentarios">
            <h3>Grado de avance con respecto al informe anterior</h3>
            <p>{comentarios.campo3}</p>
          </section>

          <section className="comentarios">
            <h3>Nivel técnico empleado en el informe</h3>
            <p>{comentarios.campo4}</p>
          </section>

          <section className="comentarios">
            <h3>Asertividad en la explicación de la aportación en el avance</h3>
            <p>{comentarios.campo5}</p>
          </section>

          <section className="comentarios">
            <h3>Nivel de propuesta de las actividades futuras</h3>
            <p>{comentarios.campo6}</p>
          </section>

          <section className="comentarios">
            <h3>Apreciación general de la información recibida</h3>
            <p>{comentarios.campo7}</p>
          </section>

          <section className="comentarios">
            <h3>Documento</h3>

            {comentarios.doc == "sin doc" ? (
              <p>No hay documento para descargar</p>
            ) : (
              <p>
                <a href={"/public/evaluaciones/" + comentarios.doc} download>
                  {" "}
                  Descargar documento
                </a>
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
