import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("entering function");
        const baseURL="http://localhost:5000/fetch";
        console.log("api firing");
        const response = await axios.get(baseURL);
        /*if(response.data.status)
        {
          alert("data received");
          alert(JSON.stringify(response.data.res));
        }*/
        console.log("hleooosgu");
        console.log(response);
        setData(response.data.res);
        setCurrentTime(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data immediately when the component mounts
    console.log("starting");
    fetchData();

    // Set up an interval to fetch data every 5 seconds (5000 ms)
    const interval = setInterval(fetchData, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      <p>Current Time: {currentTime}</p>
      <TableComponent ary={data}/>
    </div>
  );
};

export default DataFetchingComponent;


const TableComponent = (props) => {
  const data = props.ary;
  // console.log(data);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-200">Location</th>
              <th className="py-2 px-4 border-b border-gray-200">Car Count</th>
              <th className="py-2 px-4 border-b border-gray-200">Motorbike Count</th>
              <th className="py-2 px-4 border-b border-gray-200">Truck Count</th>
              <th className="py-2 px-4 border-b border-gray-200">Bus Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              // alert(JSON.stringify(row)); 
              const obj = row[index];
              // alert(JSON.stringify(obj));
              return (
                <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 border-b border-gray-200">Location{index+1}</td>
                <td className="py-2 px-4 border-b border-gray-200">{obj.car_count}</td>
                <td className="py-2 px-4 border-b border-gray-200">{obj.motorbike_count}</td>
                <td className="py-2 px-4 border-b border-gray-200">{obj.truck_count}</td>
                <td className="py-2 px-4 border-b border-gray-200">{obj.bus_count}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
