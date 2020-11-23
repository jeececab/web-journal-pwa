import React from 'react';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis } from 'recharts';

const Stats = () => {
  const data = [
    { name: '11-23', min: 15 },
    { name: '11-22', min: 30 },
    { name: '11-21', min: 5 },
    { name: '11-20', min: 10 },
    { name: '11-19', min: 16 },
    { name: '11-18', min: 15 },
    { name: '11-17', min: 30 },
    { name: '11-16', min: 5 },
    { name: '11-15', min: 10 },
    { name: '11-14', min: 16 }
  ];

  return (
    <>
      <h1 className="text-lg text-center mt-4">Neat graphs to come!</h1>
      <LineChart className="bg-gray-800 mx-auto" width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#707d99" strokeDasharray="3 3" />
        <Line type="monotone" dataKey="min" stroke="#a5b9e1" strokeWidth="2" />
        {/* <Line type="monotone" dataKey="pv" stroke="#387908"  /> */}
      </LineChart>
    </>
  );
};

export default Stats;
