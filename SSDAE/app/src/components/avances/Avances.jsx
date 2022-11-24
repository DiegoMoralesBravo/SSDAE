import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { loginContext } from '../../context/loginContext';
import { useApi } from '../../hooks/useApi'
import { NoTesis } from './NoTesis';
import { VistaAvance } from './VistaAvance';

export const Avances = () => {
  const api = useApi();
  const { user } = useContext(loginContext);
  const [tesisAsignada, setTesisAsignada] = useState(false);
  const [bandera, setBandera] = useState(1)
  const [tesis, setTesis] = useState()
  const [avances, setAvances] = useState()



  useEffect(() => {
    const checkAvances = async () => {
      let url = "http:///localhost:3000/avances/checkTesis";
      let res = await api.request(url, "POST", user);
      if (res.mensaje == 'No hay tesis asignada') {
        setTesisAsignada(false);
      } else{
        setTesisAsignada(true);
        setTesis(res.tesis)
        setAvances(res.avance)
      }
    }
    checkAvances()
  }, []);



  return (
    <>
      {tesisAsignada ? <VistaAvance tesis={tesis} avances={avances} setBandera={setBandera} bandera={bandera}/> : <NoTesis/>}
    </>
    
    
  )
}