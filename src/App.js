import {useState} from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Alert from './Components/Alert';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
function App() {

  const [alert, setAlert] = useState(true)

  const showAlert=(message,type)=>{
    setAlert(
      {msg:message,
      type:type}
    )
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  
  return (
    < > 
    <div class="scrollbar" id="style-1">
      
    <NoteState>
      <Router>
        <Navbar />
        {/* <Alert alert = {alert} /> */}
        <div className='container '>
        <Routes>
          <Route  exact path="/"  element={<Home showAlert={showAlert} />}/>
          <Route exact  path="/about" element ={<About />} />
          <Route exact  path="/login" element ={<Login />} />
          <Route exact  path="/signup" element ={<Signup />} />
        </Routes>
        </div>
      </Router>
    </NoteState>
    <div class="force-overflow"></div>
    </div>
    </>
  );
}

export default App;
