import React from "react";
import { useState } from "react";
import { Ventana } from "../Ventana";
import { ListaHistorial } from "./ListaHistorial";

export const Historial = () => {


  const [visible,setVisible] = useState(false);

  const historialRevision = [
    {
      tema: "nanoparticulas",
      alumno: "Diego morales",
      maestro: [
        {
          rol: "Director",
          nombre: "Miguel",
        },
        {
          rol: "Asesor",
          nombre: "Kevin",
        },
      ],
    },
  ];

  const avances = {
    documento: "http://diego-es-homosexual.com",
  };

  const revision = {
    nombreRevisor: "Juan perez",

    estructuraClara: 10,

    actualidad: 10,

    gradodeAvance: 10,

    asertividad: 10,

    nivelDePropuesta: 10,

    apresiacion: 8,

    promedio: 10,

    fecha: "10/10/2022",

    observaciones:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis maiores ullam vel hic similique quos porro deleniti minima voluptas perferendis atque officia libero provident, ipsum sequi in sunt neque? Dolorem",

    documento: "direcion/documentos/diego",
  };

  return (
    <div className="historial-container">
      <article className="articulo-item">
        <section className="header-card">
          <div className="datos-alumno">
            <h2>Tema: Las nanoparticulas</h2>
            <h2>Alumno: Diego Morales</h2>
            <h2>Director: Miguel Angel Torres</h2>
          </div>
        </section>

        <section className="revisiones">
          <div className="revision-bar">
            <div className="links-bar">
              <h3>1</h3>
              <ul>
                <li>
                  <a>Revision</a>
                </li>
                <li>
                  <a>Documento</a>
                </li>
                <li>
                  <a>calificacion</a>
                </li>
              </ul>
            </div>
            <button className="mas-info" onClick={() =>setVisible(true)}>click</button>
          </div>
        </section>

        <section className="revisiones">
          <div className="revision-bar">
            <div className="links-bar">
              <h3>2</h3>
              <ul>
                <li>
                  <a>Revision</a>
                </li>
                <li>
                  <a>Documento</a>
                </li>
                <li>
                  <a>calificacion</a>
                </li>
              </ul>
            </div>
            <button className="mas-info">click</button>
          </div>
        </section>

        <section className="revisiones">
          <div className="revision-bar">
            <div className="links-bar">
              <h3>3</h3>
              <ul>
                <li>
                  <a>Revision</a>
                </li>
                <li>
                  <a>Documento</a>
                </li>
                <li>
                  <a>calificacion</a>
                </li>
              </ul>
            </div>
            <button className="mas-info">click</button>
          </div>
        </section>

        <section className="revisiones">
          <div className="revision-bar">
            <div className="links-bar">
              <h3>4</h3>
              <ul>
                <li>
                  <a>Revision</a>
                </li>
                <li>
                  <a>Documento</a>
                </li>
                <li>
                  <a>calificacion</a>
                </li>
              </ul>
            </div>
            <button className="mas-info">click</button>
          </div>
        </section>
      </article>

      {visible && <Ventana componente={<ListaHistorial/>} setVisible={setVisible}/>}

    </div>

  );
};
