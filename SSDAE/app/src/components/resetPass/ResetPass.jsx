import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { NotFound } from "../NotFound";
import { ResetForm } from "./ResetForm";

export const ResetPass = () => {
  const api = useApi();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const key = urlParams.get("key");
  const email = urlParams.get("correo");

  const [view, setView] = useState();

  useEffect(() => {
    const validationToken = async () => {
      console.log(key);

      if (key && email) {
        let dataForm = {
          token: key,
          correo: email,
        };

        const url = "http:///localhost:3000/resetPass/tokenvalidation";
        try {
          let res = await api.request(url, "POST", dataForm);
          if (res.mensaje == "user found") {
            setView(<ResetForm email={email} />);
          } else {
            setView(<NotFound />);
          }
        } catch (error) {
            console.log(error)
        }
      } else {
        setView(<NotFound />);
      }
    };
    validationToken();
  }, []);

  return view;
};
