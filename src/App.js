import React, { useEffect, useState } from 'react'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login'
import Home from './Pages/Home'
import BlockAccess from './Pages/BlockAccess';
import axios from 'axios'


function App() {
  const [access,setAccess] = useState(false);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/is_allowed`)
    .then(res => {
      setAccess(res.data.status)
    })
    .catch(err => console.log(err));

  },[]);
    return (
      <Router>
      <div className="App">
       <ul className="App-header">
         <li>
           <Link to="/">Home</Link>
         </li>
         <li>
           <Link to="/dashboard">Dashboard</Link>
         </li>
         <li>
           <Link to="/login">Login</Link>
         </li>
       </ul>
      {
        access ? 
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/dashboard' element={< Dashboard />}></Route>
          <Route exact path='/login' element={< Login />}></Route>
        </Routes> : 
        <Routes>
            <Route exact path='/' element={< BlockAccess />}></Route>
        </Routes>
      }
     </div>
  </Router>
    )
}

export default App