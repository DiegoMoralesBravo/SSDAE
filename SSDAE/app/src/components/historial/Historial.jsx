import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Ventana } from "../Ventana";
import { ListaHistorial } from "./ListaHistorial";
import { useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { useApi } from "../../hooks/useApi";

export const Historial = () => {
  const [cargando, setCargando] = useState(true);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(loginContext);
  const api = useApi();
  const [tesisState, setTesis] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(tesisState);
  }, [tesisState]);

  const getData = async () => {
    console.log(user);

    let url = "http:///localhost:3000/historial/alumnos";
    let res = await api.request(url, "POST", user);

    console.log(res);

    if (res.mensaje == "succes") {
      console.log("entro al if");
      setTesis(res.tesis);
    }

    setCargando(false);
  };

  return (
    <>
      {cargando ? (
        "Cargando informacion..."
      ) : tesisState.length >= 1 ? (
        <div className="historial-container">
          <article className="articulo-item">
            <section className="header-card">
              <div className="datos-alumno">
                <h2>{tesisState[0].tema}</h2>
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
                <button className="mas-info" onClick={() => setVisible(true)}>
                  click
                </button>
              </div>
            </section>
          </article>

          {visible && (
            <Ventana componente={<ListaHistorial />} setVisible={setVisible} />
          )}
        </div>
      ) : (
        <h1>No hay nada para mostrar...</h1>
      )}
    </>
  );
};
