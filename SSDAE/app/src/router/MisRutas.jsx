import React from 'react'
import { useContext } from 'react';
import { Routes, NavLink, Route, BrowserRouter, } from "react-router-dom";
import { loginContext } from '../context/loginContext'
import { ResetPass } from '../components/resetPass/ResetPass'
import { Home } from '../components/Home'
import { Login } from '../components/login/Login'
import { Navbar } from '../components/Navbar';
import { NotFound } from '../components/NotFound';



export const MisRutas = () => {

  const { login } = useContext(loginContext);

  return (

    <BrowserRouter>
      {login && <Navbar />}
      <Routes>
        <Route path="/" element={login ? <Home /> : <Login />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>

  )
}

