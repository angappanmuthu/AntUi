import React,{useEffect, useState} from 'react'
import axios from 'axios'

function Home() {
  const [status,setStatus] = useState(false);

  const get_status = () => axios.post(`${process.env.REACT_APP_BASE_URL}/api/motor_status`,{"motor_label" : "Motor"})
  .then(res => setStatus(res.data[0].motor_status))
  .catch(err => console.log(err));

  useEffect(() => {
    get_status();
  },[]);

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Sure to Trun ${!status ? "ON" : "OFF"} Motor!`);
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/motor_control`,{"motor_label" : "Motor","motor_status" : !status})
    .then(res => setStatus(!status))
    .catch(err => console.log(err));
  }

  return (
    <div>
      <input type="submit" value={status ? "ON" : "OFF"} onClick={onSubmit}/>
    </div>
  )
}

export default Home