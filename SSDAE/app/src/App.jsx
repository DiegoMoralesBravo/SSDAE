import React, { useState } from 'react'

import { loginContext } from './context/loginContext';
import { MisRutas } from './router/MisRutas'
import { Footer } from './components/Footer';
import { useEffect } from 'react';
function App() {

  const [showPassForm, setShowPassForm] = useState(false);
  const [login, setLogin] = useState(false);
  
  const [user, setUser] = useState()


  useEffect(() => {
    console.log('SE EJECUTA AL CARGAR');
  }, [])

  useEffect(() => {
    console.log('SE EJECUTA AL modificar el usuario');

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
