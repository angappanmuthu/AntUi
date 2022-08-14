import {Navigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import { Styles } from '../components/Styles'
import axios from 'axios'
import NavBar from '../components/NavBar'
import API from '../api'

const SigninForm = () => {

    const [nav,setNav] = useState(false);

    const [data,setData] = useState({
        username : "",
        password : "",
    });

    const [motor_status,setMotorStatus] = useState(false);

    const handleChange = (e) => setData({...data,[e.target.name] : e.target.value});

    const loginButton = (e) => {
      e.preventDefault();
      console.log(API);
      axios.post(`${API}/api/login`,data).then(res => {
          if (res.data.status) {
              console.log('token',res.data)
              console.log(data);
              localStorage.setItem('token',res.data['token'])
              localStorage.setItem('is_motor_allowed',res.data.motor_access)
              setNav(res.data.status);
              console.log(res.data);
          }
      }).catch(err => console.log(err));
  }

    return nav ? <Navigate to="/dashboard" /> : (
      <div>
        <NavBar />
        <section className={`relative bg-white my-24`}>
        <div className={'h-full  flex  justify-center items-center'}>
          <div className={'w-full max-w-lg  flex  justify-center'}>
            <div className={'leading-loose'}>
              <form
                onSubmit={loginButton}
                className={`${Styles.FormAuthContainer} my-10`}
              >
                <p className={'text-black dark:text-white text-center text-lg font-bold'}>Sign In</p>

                <div className="mt-2">
                  <label className={Styles.FormAuthLabel} htmlFor="name">
                    Name
                  </label>
                  <input
                    className={Styles.FormAuthInput}
                    type="text"
                    onChange={handleChange}
                    value={data.username}
                    id="name"
                    name="username"
                    required
                  />
                </div>

                <div className="mt-2">
                  <label className={Styles.FormAuthLabel} htmlFor="password">
                    Password
                  </label>
                  <input
                     className={Styles.FormAuthInput}
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className={'mt-4 items-center flex justify-between'}>
                    <Button name={'Sign In'}/>
                </div>
              
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
  }

export default SigninForm