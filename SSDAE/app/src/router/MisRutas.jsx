import React from 'react'
import { useContext } from 'react';
import { Routes, NavLink, Route, BrowserRouter, } from "react-router-dom";
import { loginContext } from '../context/loginContext'
import { ResetPass } from '../components/ResetPass'
import { Home } from '../components/Home'
import { Login } from '../components/login/Login'
import { Navbar } from '../components/Navbar';




//{ login ? <MisRutas /> : <Login setLogin={setLogin} setShowPassForm={setShowPassForm} showPassForm={showPassForm} /> }

export const MisRutas = () => {

  const { login } = useContext(loginContext);

  return (

    <BrowserRouter>
      {login && <Navbar />}
      <Routes>
        <Route path="/" element={login ? <Home /> : <Login />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="/*" element={<div>LA PAGINA NO EXISTE</div>} />
      </Routes>
    </BrowserRouter>

  )
}

