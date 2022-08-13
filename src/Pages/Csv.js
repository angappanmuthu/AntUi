import React,{useEffect, useState} from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Csv() {

  const [token,setToken] = useState(undefined);

  const navigate = useNavigate();
    const [data,setData] = useState([{}]);

    const refresh = () => 
    axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/log`,
      {headers: {
              "Content-type": "Application/json",
              "Authorization": `token ${token}`
              }   
          }
    ).then(res => {
        setData(res.data)
    }).catch(err => console.log(err));


    useEffect(()=>{
      setToken(localStorage.getItem('token'))

        if (token){
          refresh();
        }
    }, [token]);

  return (
    <div classname="App">
      <p>{token}</p>
      <h3>Export data to CSV in React - <a href="https://cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
        <CSVLink data={data}>Download me</CSVLink>
        {/* <CSVDownload data={data} target="_blank" /> */}
    </div>
  );
}

export default Csv;