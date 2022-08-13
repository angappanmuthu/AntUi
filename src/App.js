import React, { useEffect, useState } from 'react'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login'
import Home from './Pages/Home'
import BlockAccess from './Pages/BlockAccess';
import axios from 'axios'
import Topnav from './components/Topnav';
import Footer from './components/Footer';
import SigninForm from './Pages/SigninForm';
import Csv from './Pages/Csv';
import NavBar from './components/NavBar';

function App() {
  const [access,setAccess] = useState(true);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/is_allowed`)
    .then(res => {
      localStorage.removeItem('motor_status')
      setAccess(res.data.status)
      console.log(res.data.status)
    })
    .catch(err => console.log(err));

  },[]);
    return (
      <Router>
      <div className="relative h-screen">
      {/* <Topnav /> */}      
      {
        access ? 
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/dashboard' element={< Dashboard />}></Route>
          <Route exact path='/login' element={< SigninForm />}></Route>
          <Route exact path='/csv' element={< Csv />}></Route>
        </Routes> : 
        <Routes>
            <Route exact path='/' element={< BlockAccess />}></Route>
        </Routes>
      }

      <Footer />
     </div>

     
  </Router>

  
    )
}

export default App