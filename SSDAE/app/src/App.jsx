import { useState } from 'react'
import { Login } from './components/Login'
import { Home } from './components/Home'


function App() {
  const [login, setLogin] = useState(false);


  return (
    <div className="App">
        {login ? <Home/> : <Login setLogin={setLogin} />}

    </div>
  )
}

export default App
