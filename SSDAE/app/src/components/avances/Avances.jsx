import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { loginContext } from "../../context/loginContext";
import { useApi } from "../../hooks/useApi";
import { NoTesis } from "./NoTesis";
import { VistaAvance } from "./VistaAvance";

export const Avances = () => {
  const api = useApi();
  const { user } = useContext(loginContext);
  const [tesisAsignada, setTesisAsignada] = useState(false);
  const [tesis, setTesis] = useState();
  const [buzon, setBuzon] = useState();
  const [avances, setAvances] = useState();

  useEffect(() => {
    const checkAvances = async () => {
      let url = "http:///localhost:3000/avances/checkTesis";

      try {
        let res = await api.request(url, "POST", user);
        if (res.mensaje == "No hay tesis asignada") {
          setTesisAsignada(false);
        } else {
          setTesisAsignada(true);
          setTesis(res.tesis);
          setAvances(res.avance);
          setBuzon(res.buzon);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAvances();
  }, []);

  return (
    <>
      {tesisAsignada ? (
        <VistaAvance tesis={tesis} avances={avances} buzon={buzon} />
      ) : (
        <NoTesis />
      )}
    </>
  );
};
