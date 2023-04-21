// import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// import React, { PureComponent, useEffect, useState } from 'react';

// const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
//   return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`value: ${value}`}</text>;
// };

// const BarChartBlue = ({prices})=> {
//   const demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           width={500}
//           height={300}
//           data={prices}
//           margin={{
//             top: 15,
//             right: 5,
//             left: -50,
//             bottom: 0,
//           }}
//           label={renderCustomBarLabel}
//         >
//           <XAxis/>
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Bar dataKey="pv" fill="#388AEA"  barSize={17}/>
//         </BarChart>
//       </ResponsiveContainer>
//     );
// }
// export default BarChartBlue;

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

const BarChartBlue = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7'
      );
      const formattedData = result.data.total_volumes.map((data) => ({
        name: new Date(data[0]).toLocaleDateString(),
        tradingValue: data[1],
      }));
      setChartData(formattedData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <BarChart width={300} height={150} data={chartData} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="tradingValue" fill="#388AEA" />
      </BarChart>
    </div>
  );
};

export default BarChartBlue;