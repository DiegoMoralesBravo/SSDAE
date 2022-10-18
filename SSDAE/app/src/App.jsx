import React, { useState } from 'react'

import { loginContext } from './context/loginContext';
import { MisRutas } from './router/MisRutas'
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
function App() {

  const [showPassForm, setShowPassForm] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState('')

  useLayoutEffect(() => {
    console.log('SE EJECUTA AL CARGAR');
    console.log(user)

    let storedUser = JSON.parse(localStorage.getItem("usuario"));
    console.log(storedUser)
    if(storedUser){
      console.log('si hay')
      setUser(storedUser);
      setLogin(true)
    } else{
      console.log('no hay nada')
    }


  }, [])

  useEffect(() => {
    console.log('SE EJECUTA AL modificar el usuario');
    console.log(user)
    localStorage.setItem("usuario", JSON.stringify(user));

  }, [user])

  return (
    <div className="App">

      <loginContext.Provider value={{
        showPassForm,
        setShowPassForm,
        login,
        setLogin,
        user,
        setUser
      }}>

        <MisRutas />


      </loginContext.Provider>


    </div>
  )
}

export default App
