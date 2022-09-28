import { useState } from 'react'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { ResetPass } from './components/ResetPass';


function App() {
  let formDisplay;

  const [login, setLogin] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);


  if(showPassForm){
    formDisplay = <ResetPass setShowPassForm={setShowPassForm} />;
  }else{
    formDisplay = <Login setLogin={setLogin} setShowPassForm={setShowPassForm} />;
  }


  return (
    <div className="App">
     {login ? <Home/> : formDisplay}
    </div>
  )
}

export default App
