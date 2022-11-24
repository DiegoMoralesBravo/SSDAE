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
    let storedUser = JSON.parse(localStorage.getItem("usuario"));
    if(storedUser){
      setUser(storedUser);
      setLogin(true)
    }
  }, [])

  useEffect(() => {

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
