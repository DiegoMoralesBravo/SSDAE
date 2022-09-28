import { useState } from 'react'
import { Login } from './components/login/Login'
import { Home } from './components/Home'


function App() {
  let formDisplay;

  const [login, setLogin] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);


  return (
    <div className="App">
     {login ? <Home/> : <Login setLogin={setLogin} setShowPassForm={setShowPassForm} showPassForm={showPassForm}/>}
    </div>
  )
}

export default App
