import React from "react";
//Importar los módulos
import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { loginContext } from "../../context/loginContext";
import { useContext } from "react";
import { useEffect } from "react";

export const Formulario = ({ avance, setVisible }) => {
  //------------------------------------------------------
  //Esto es para acceder al nombre del profesor:
  const { user } = useContext(loginContext);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const api = useApi();

  useEffect(() => {
    const sendData = async () => {
      var formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(data));
      formData.append("user", JSON.stringify(user));
      formData.append("avance", JSON.stringify(avance));

      let url = "http:///localhost:3000/evaluacion/save";

      try {
        let res = await api.request(url, "POST", formData, true);
        console.log(res);
        if (res.mensaje == "Formatos aceptados: jpg, png, pdf, doc y txt") {
          alert("Solo formatos de imagen o texto (jpg, png, pdf, doc y txt)");
        } else {
          setVisible(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (data != null) {
      sendData();
    }
  }, [data]);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const conseguirDatosFormulario = async (e) => {
    e.preventDefault();

    let datos = e.target;

    let evaluacion = {
        campo1: datos.campo1.value,
        campo2: datos.campo2.value,
        campo3: datos.campo3.value,
        campo4: datos.campo4.value,
        campo5: datos.campo5.value,
        campo6: datos.campo6.value,
        campo7: datos.campo7.value,
    };

    setData(evaluacion);
  };

  //------------------------------------------------------
  //El código HTML:
  return (
    <div className="form">
      <div>
        <form onSubmit={conseguirDatosFormulario}>
          <h2>Acta de calificación del avance de tesis</h2>
          <h3>
            ---------------------------------------------------------------
          </h3>
          <br></br>

          <label>Estructura y calidad del documento</label>
          <input
            type="number"
            name="campo1"
            placeholder="0-100"
            min="0"
            max="100"
            required
          />

          <label>Amplitud y actualidad de la información utilizada</label>
          <input
            type="number"
            name="campo2"
            placeholder="0-100"
            min="0"
            max="100"
            required
          />

          <label>Grado de avance con respecto al informe anterior</label>
          <input
            type="number"
            name="campo3"
            placeholder="0-100"
            min="0"
            max="100"
            required
          />

          <label>Nivel técnico empleado en el informe</label>
          <input
            type="number"
            name="campo4"
            placeholder="0-100"
            min="0"
            max="100"
            required
          />

          <label>
            Asertividad en la explicación de la aportación en el avance
          </label>
          <input
            type="number"
            name="campo5"
            placeholder="0-100"
            min="0"
            max="100"
            required
          />

          <label>Nivel de propuesta de las actividades futuras</label>
          <input
            type="number"
            name="campo6"
            placeholder="0-100"
            min="0"
            max="100"
            required
          />

          <label>Apreciación general de la información recibida</label>
          <input
            type="number"
            name="campo7"
            placeholder="0-100"
            min="0"
            max="100"
            required
          />
          <label>Observaciones generales</label>

          {/* <p>Campo no obligatorio</p>
          <input
            type="text"
            name="obGen"
            placeholder="Observaciones generales (No obligatorio)"
          /> */}

          <br></br>
          <label>Comentarios (Solo archivos de imagen o texto)</label>

          <p>Campo no obligatorio</p>
          <input type="file" name="file" onChange={saveFile} />

          <p style={{ display: "none" }}>*Usuario y/o contraseña incorrectos</p>

          <br></br>

          <button>Enviar evaluacion</button>
        </form>
      </div>
    </div>
  );
};
