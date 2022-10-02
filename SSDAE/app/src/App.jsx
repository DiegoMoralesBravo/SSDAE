import { useState } from 'react'
import { loginContext } from './context/loginContext';
import { MisRutas } from './router/MisRutas'
function App() {

  const [showPassForm, setShowPassForm] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
      
      <loginContext.Provider value={{
        showPassForm,
        setShowPassForm,
        login,
        setLogin
      }}>

        <MisRutas />

      </loginContext.Provider>
    </div>
  )
}

export default App
