import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

function Login() {

    const [nav,setNav] = useState(false);

    const [data,setData] = useState({
        username : "",
        password : ""
    });

    const handleChange = (e) => setData({...data,[e.target.name] : e.target.value});

    const loginButton = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/is_user`,data).then(res => {
            setNav(true);
        }).catch(err => console.log(err));
    }

    return nav ? <Navigate to={'/dashboard'} /> :(
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