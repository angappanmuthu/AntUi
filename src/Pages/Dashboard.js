import BarChart from "../components/BarChart";
import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import NavBar from "../components/NavBar";

function Dashboard() {

  const [sensorData,setSensorData] = useState();

  const token = localStorage.getItem('token')

  const [devices,setDevices] = useState([]);

  const [device,setDevice] = useState("");

  const [rdevice,setRdevice] = useState("");

  const [status,setStatus] = useState(false);

  const navigate = useNavigate();

  const redirect = () => navigate('/login');

  const get_status = () => axios.post(`${process.env.REACT_APP_BASE_URL}/api/motor_status`,{"motor_label" : "Motor"})
  .then(res => {
    setStatus(res.data[0].motor_status)
    console.log(res.data)
    console.log("motor |")
  })
  .catch(err => console.log(err));

  const handleChange = (e) => {
    setDevice(e.target.value);
  };

  const get_devices = () => axios.get(`${process.env.REACT_APP_BASE_URL}/api/devices`,{
    headers: {
      // 'Access-Control-Allow-Origin' : '*',
      "Content-type": "Application/json",
      "Authorization": `token ${token}`
      },
  },
  { withCredentials: true },
  )
  .then(res => {
    setDevices(res.data);
  }).catch(err => console.log(err));

  const refresh = () => axios.post(`${process.env.REACT_APP_BASE_URL}/api/device_log`,{
    device_id : device
  },
  {
    headers: {
      "Content-type": "Application/json",
      "Authorization": `token ${token}`
      },
  },
  { withCredentials: true },
  )
  .then(res => {
    setRdevice(res.data[0].device_id.device);
    setSensorData({
      labels : res.data.map(e => new Date(e.created_at).toLocaleString()),
      datasets : [{
        label : "Temperature",
        data : res.data.map(e => parseFloat(e.temperature)),
        fill: false,
        borderColor: 'rgba(176, 10, 35, 0.8)',
        tension : 0.4
      },
      {
        label : "Humidity",
        data : res.data.map(e => parseFloat(e.humidity)),
        fill: false,
        borderColor: 'rgba(7, 68, 189, 0.8)',
        tension : 0.4
      },
      {
        label : "Battery Level",
        data : res.data.map(e => parseFloat(e.battery_level)),
        fill: false,
        borderColor: 'rgba(207, 90, 12, 0.8)',
        tension : 0.4
      },

      {
        label : "Ph Value",
        data : res.data.map(e => parseFloat(e.ph_value)),
        fill: false,
        borderColor: 'rgba(216, 203, 12, 0.8)',
        tension : 0.4
      },

      {
        label : "Water Flow Speed",
        data : res.data.map(e => parseFloat(e.water_flow_speed)),
        fill: false,
        borderColor: 'rgba(207, 90, 12, 0.8)',
        tension : 0.4
      },

      {
        label : "Water Flow Quantity",
        data : res.data.map(e => parseFloat(e.water_flow_liter)),
        fill: false,
        borderColor: 'rgba(3, 180, 219, 0.8)',
        tension : 0.4
      },

      {
        label : "Soil Moisture",
        data : res.data.map(e => parseFloat(e.soil_moisture)),
        fill: false,
        borderColor: 'rgba(35, 170, 12, 0.8)',
        tension : 0.4
      },
    ],
    });
  })
  .catch(err => console.log(err));


  const onSubmit = (e) => {
    e.preventDefault();
    refresh();
  }

  const onTap = (e) => {
    e.preventDefault();
    alert(`Sure to Trun ${!status ? "ON" : "OFF"} Motor!`);
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/motor_control`,{"motor_label" : "Motor","motor_status" : !status})
    .then(res => setStatus(!status))
    .catch(err => console.log(err));
  }

  useEffect (() => {
    get_devices(); 
    get_status();
    if (!localStorage.getItem('token')) {
        redirect();
    }
  },[]);
 
  return (
    <div className="App">
      <NavBar />
      <div className="flex">
      <form className="flex m-10">
        {devices ? 
        <select className="form-select appearance-none
        block
        w-40
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" onChange={(e) => {handleChange(e);}} value={device}>
          <option selected hidden>Select Device</option>
          {devices.map(e => <option value={e}>{e}</option>)}
        </select> 
        : ""}

        <input className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type='submit' value="Show" onClick={onSubmit}/>

    
      </form>

      <div className="flex m-10">
      <p className="py-2 text-sm"></p> Motor Status {JSON.parse(localStorage.getItem('is_motor_allowed')) === true ? <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" value={status ? "ON" : "OFF"} onClick={onTap}/> : ""}
      </div>
      </div>

     


      <p className="m-10">{`You selected ${rdevice}`}</p>
      
      {sensorData ? <div className="justify-center pb-36">
        <BarChart chartData={sensorData} />
      </div> : ""}
      
    </div>
  );
}

export default Dashboard;
