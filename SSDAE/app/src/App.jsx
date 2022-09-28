import { useState } from 'react'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { ResetPass } from './components/ResetPass';


function App() {



  const [login, setLogin] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);


  return (
    <div className="App">
        {showPassForm ? <ResetPass setShowPassForm={setShowPassForm}/> : <Login setLogin={setLogin} setShowPassForm={setShowPassForm}/>}
    </div>
  )
}

export default App
