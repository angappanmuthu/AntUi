import React from 'react'
import { Bar,Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function BarChart({chartData}) {
  return (
    <div>
      <Line data={chartData} options={{
        scales : {
          y : {
            beginAtZero: true,
          },
        },
      }}/>
    </div>
  )
}

export default BarChart