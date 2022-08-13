import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function Topnav() {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const [token,setToken] = useState(undefined)

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[]);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div>
      <div
        className={`bg-black w-full flex items-center justify-end  py-6 px-8 space-x-6`}
      >
        <a href="/" className="text-white font-bold mr-auto text-xl md:px-14">
          <img src="/img/ANT-Logo.png" className="h-10" alt="Ant Solution" />
        </a>
        <div className="hidden md:block font-bold text-white">
          <Link
            to="/"
            className="px-3 py-2 hover:bg-white hover:text-black transition rounded-3xl duration-400 ease-in"
          >
            Home
          </Link>
        </div>
        <div className="hidden md:block font-bold text-white">
          <Link
            to="/dashboard"
            className="px-3 py-2 hover:bg-white hover:text-black transition rounded-3xl duration-400 ease-in"
          >
            Dashboard
          </Link>
        </div>
     
        <div className="hidden md:block font-bold text-white">
          {!token ? 
          <Link to='/login'>
            <div className="px-3 py-2 transform -skew-x-12 bg-transparent border-2 border-emerald-400 text-emerald-400 hover:shadow hover:shadow-emerald-400 transition  duration-400 ease-in">
              <span>Login {JSON.stringify(token)}</span>
            </div>
          </Link> 
          : 
          <button onClick={logout}>
            <div className="px-3 py-2 transform -skew-x-12 bg-transparent border-2 border-emerald-400 text-emerald-400 hover:shadow hover:shadow-emerald-400 transition  duration-400 ease-in">
              <span>Logout {JSON.stringify(token)}</span>
            </div>
          </button>
          }
        </div>

        {isOpen ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="md:hidden inline-flex items-center justify-center text-white transition duration-400 ease-in"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="md:hidden inline-flex items-center justify-center text-white transition duration-400 ease-in"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        )}
      </div>
      {isOpen ? (
        <div className="bg-black w-full py-6 fixed z-50 mt-14 transition duration-400 ease-in">
          <div className="font-bold text-white text-center pb-2">
            <Link
              to="/"
              className="px-3 py-2 hover:bg-white hover:text-black transition rounded-3xl duration-400 ease-in"
            >
              Home
            </Link>
          </div>
          <div className="font-bold text-white text-center py-2">
            <Link
              to="/dashboard"
              className="px-3 py-2 hover:bg-white hover:text-black transition rounded-3xl duration-400 ease-in"
            >
              Dashboard
            </Link>
          </div>
          <div className="font-bold text-white text-center py-2">
            <Link
              to="/login"
              className="px-3 py-2 hover:bg-white hover:text-black transition rounded-3xl duration-400 ease-in"
            >
              Login {JSON.stringify(token)}
            </Link>
          </div>
          
          
          
          
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Topnav