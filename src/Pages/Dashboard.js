import BarChart from "../components/BarChart";
import {useEffect, useState} from 'react'
import axios from 'axios'

function Dashboard() {

  const [sensorData,setSensorData] = useState();

  const [devices,setDevices] = useState([]);

  const [device,setDevice] = useState("");

  const [rdevice,setRdevice] = useState("");

  let clear;

  const handleChange = (e) => {
    setDevice(e.target.value);
  };

  const get_devices = () => axios.get(`${process.env.REACT_APP_BASE_URL}/api/devices/`)
  .then(res => setDevices(res.data)).catch(err => console.log(err));

  const refresh = () => axios.post(`${process.env.REACT_APP_BASE_URL}/api/device_log`,{device_id : device})
  .then(res => {
    setRdevice(res.data[0].device_id.device);
    setSensorData({
      labels : res.data.map(e => e.id),
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

  useEffect (() => {
    get_devices(); 
  },[]);


  const onSubmit = (e) => {
    e.preventDefault();
    refresh();
  }
 
  return (
    <div className="App">
      <form>
        {devices ? 
        <select onChange={(e) => {handleChange(e);}} value={device}>
          <option selected hidden>Select Device</option>
          {devices.map(e => <option value={e}>{e}</option>)}
        </select> 
        : ""}
        <input type='submit' value="Show" onClick={onSubmit}/>
      </form>

      <p>{`You selected ${rdevice}`}</p>
      
      {sensorData ? <BarChart chartData={sensorData} /> : ""}
    </div>
  );
}

export default Dashboard;
