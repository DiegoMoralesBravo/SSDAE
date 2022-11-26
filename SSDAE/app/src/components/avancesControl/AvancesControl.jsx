import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";

export const AvancesControl = () => {
  const [data, setData] = useState([]);
  const [bandera, setBandera] = useState(1);

  const api = useApi();

  useEffect(() => {
    console.log("Test");
    getData();
  }, [, bandera]);

  const getData = async () => {
    const url = "http:///localhost:3000/avances/avancesControl";

    try {
      let res = await api.request(url, "GET");
      setData(res.avancescontrolTable);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };

  const activarDesactivar = async (ano_ingreso, ciclo, estatus) => {
    let mensaje;

    if (estatus == "abierto") {
      mensaje =
        "Desea abrir el buzon para el ano: " +
        ano_ingreso +
        " del ciclo: " +
        ciclo;
    } else {
      mensaje =
        "Desea cerrar el buzon para el ano: " +
        ano_ingreso +
        " del ciclo: " +
        ciclo;
    }

    if (confirm(mensaje)) {
      try {
        const url = "http:///localhost:3000/avances/activarDesactivar";
        let res = await api.request(url, "POST", {
          ano_ingreso,
          ciclo,
          estatus,
        });
        setBandera(bandera + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container-table-min">
      <div className="header">
        <p>Avances panel</p>
      </div>
      <table>
        <tbody className="tabla">
          <tr>
            <th>
              <strong>Ano</strong>
            </th>
            <th>
              <strong>Ciclo</strong>
            </th>
            <th>
              <strong>Buzon</strong>
            </th>
          </tr>

          {data.map((row) => {
            return (
              <tr key={row.ano_ingreso + row.ciclo}>
                <td>{row.ano_ingreso}</td>
                <td>{row.ciclo}</td>
                <td className="row-table">
                  {row.estatus == "cerrado" ? (
                    <button
                      onClick={() =>
                        activarDesactivar(row.ano_ingreso, row.ciclo, "abierto")
                      }
                    >
                      Activar
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        activarDesactivar(row.ano_ingreso, row.ciclo, "cerrado")
                      }
                    >
                      Desactivar
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
