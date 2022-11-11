import React from 'react'
import { useContext } from 'react';
import { Routes, NavLink, Route, BrowserRouter, } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { loginContext } from '../context/loginContext'
import { ResetPass } from '../components/resetPass/ResetPass'
import { ResetForm } from '../components/resetPass/ResetForm'
import { Home } from '../components/Home'
import { Login } from '../components/login/Login'
import { Navbar } from '../components/Navbar';
import { NotFound } from '../components/NotFound';
import { CrearUsuarios } from '../components/usuarios/CrearUsuarios';
import { EditarUsuarios } from '../components/usuarios/EditarUsuarios';
import { TablaUsuarios } from '../components/usuarios/TablaUsuarios';
import { CrearTesis } from '../components/tesis/CrearTesis';
import { TablaTesis } from '../components/tesis/TablaTesis';
import { Avances } from '../components/avances/Avances';




export const MisRutas = () => {

  const { login, user } = useContext(loginContext);

  return (

    <BrowserRouter>


      {login && <Navbar />}


      <Routes>

        <Route path="/" element={login ? <Home /> : <Login />} />

        <Route path="/resetpass" element={<ResetPass />} />

        {login ? <>

          <Route path="/resetform" element={<ResetForm />} />
          <Route path="/Usuarios" element={<TablaUsuarios />} />
          <Route path="/Tesis" element={<TablaTesis />} />

        </> : ''}

        {user.tipo_usuario == 'root' ? <>
          <Route path="/Avances" element={<Avances />} />'
        </> : ''}
       
        <Route path="/*" element={<Navigate to='/' />} />

      </Routes>



    </BrowserRouter>

  )
}

