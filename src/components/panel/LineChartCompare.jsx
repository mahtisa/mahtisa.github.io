import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

const LineChartCompare = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14'
      );
      const tetherResult = await axios(
        'https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=14'
      );
      const bitcoinData = result.data.prices.map((data) => ({
        date: new Date(data[0]).toLocaleDateString(),
        bitcoinPrice: data[1],
      }));
      const tetherData = tetherResult.data.prices.map((data) => ({
        date: new Date(data[0]).toLocaleDateString(),
        tetherPrice: data[1],
      }));
      const mergedData = bitcoinData.map((data, index) => ({
        ...data,
        ...tetherData[index],
      }));
      setChartData(mergedData);
    };
    fetchData();
  }, []);

  return (
    <>
      <LineChart width={600} height={300} data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Line type="monotone" dataKey="bitcoinPrice" stroke="#8884d8" />
        <Line type="monotone" dataKey="tetherPrice" stroke="#82ca9d" />
      </LineChart>
    </>
  );
};

export default LineChartCompare;