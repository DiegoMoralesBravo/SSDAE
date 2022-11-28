import React from "react";
import { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { loginContext } from "../context/loginContext";
import { ResetPass } from "../components/resetPass/ResetPass";
import { ResetForm } from "../components/resetPass/ResetForm";
import { Home } from "../components/Home";
import { Login } from "../components/login/Login";
import { Navbar } from "../components/Navbar";
import { TablaUsuarios } from "../components/usuarios/TablaUsuarios";
import { TablaTesis } from "../components/tesis/TablaTesis";
import { Historial } from "../components/historial/Historial";
import { Avances } from "../components/avances/Avances";
import { AvancesControl } from "../components/avancesControl/AvancesControl";
import { RevisionControl } from "../components/revisionControl/RevisionControl";
import { Evaluacion } from "../components/evaluacion/Evaluacion";


export const MisRutas = () => {

  const { login, user } = useContext(loginContext);


  return (
    <BrowserRouter>
      {login && <Navbar />}

      <Routes>
        <Route path="/" element={login ? <Home /> : <Login />} />
        <Route path="/resetpass" element={<ResetPass />} />


        {login ? (
          <>
              <Route path="/resetform" element={<ResetForm />} />
              {user.tipo_usuario == 'root' ? <Route path="/Usuarios" element={<TablaUsuarios />} />:""}
              {user.tipo_usuario == 'root' ? <Route path="/Tesis" element={<TablaTesis />} />:""}              
              {user.tipo_usuario == 'root' ? <Route path="/RevisionControl" element={<RevisionControl/>} />:""}
              {user.tipo_usuario == 'root' ? <Route path="/AvancesControl" element={<AvancesControl/>} />:""}
              {user.tipo_usuario != 'root' ? <Route path="/historial" element={<Historial/>} />:""}
              {user.tipo_usuario == 'maestro' ? <Route path="/evaluacion" element={<Evaluacion />} />:""}
              {user.tipo_usuario == 'alumno' ? <Route path="/Avances" element={<Avances />} /> : ''}
              
          </>
          ):''}
        <Route path="/*" element={<Navigate to='/' />} />

      </Routes>
    </BrowserRouter>
  );
};
