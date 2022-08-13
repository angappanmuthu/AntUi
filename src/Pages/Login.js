import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

function Login() {

    const [nav,setNav] = useState(false);

    const [data,setData] = useState({
        username : "",
        password : "",
    });

    const [motor_status,setMotorStatus] = useState(false);

    const handleChange = (e) => setData({...data,[e.target.name] : e.target.value});

    const loginButton = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/login`,{
            headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `token ${localStorage.getItem('token')}`
            },
            body : data,
        }).then(res => {
            if (res.data.status) {
                localStorage.setItem('token',res.data['token'])
                setNav(res.data.status);
                setMotorStatus(res.data.data[0].motor_access)
                localStorage.setItem('is_motor_allowed',res.data.data[0].motor_access)
                console.log(res.data)
            }
        }).catch(err => console.log(err));
    }

    return /*nav ? <Navigate to={'/dashboard'} /> : */ (
        <div>
            <form onSubmit={loginButton}>
                <input type="text" placeholder='username' name="username" value ={data.username} onChange={handleChange}/>
                <input type="password" placeholder='password' name="password" value ={data.password} onChange={handleChange}/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login