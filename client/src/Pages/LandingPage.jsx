import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("entering function");
        const baseURL = "http://localhost:5000/fetch";
        console.log("api firing");
        const response = await axios.get(baseURL);
        /*if(response.data.status)
        {
          alert("data received");
          alert(JSON.stringify(response.data.res));
        }*/
        console.log('response : ', response.data.res);
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
    <div className='p-4'>
      <div className='w-fit p-4 border-2 border-slate-200 rounded-lg'>
        <h1>Fetched Data</h1>
        <p>Last Updated: {currentTime}</p>
      </div>

      <TableComponent ary={data} />
    </div>
  );
};

export default LandingPage;

const TableComponent = (props) => {
  const data = props.ary;

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
              <th className="py-2 px-4 border-b border-gray-200">Congestion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const obj = row[index];
              const total = obj.car_count + obj.motorbike_count * 0.5 + obj.truck_count * 2 + obj.bus_count * 2.5;
              console.log('obj', obj);
              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    <a href={obj.link} target='_blank' className='hover:underline'>
                      Location {index + 1}
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    {obj.car_count}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    {obj.motorbike_count}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    {obj.truck_count}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    {obj.bus_count}
                  </td>
                  <td className={`py-2 px-4 border-b border-gray-200 text-center ${total <= 8 ? "bg-green-500"
                    : total > 8 && total <= 15 ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className='w-full flex flex-col gap-2 my-4 p-4 border-2 border-slate-200 rounded-lg'>
          <p className='flex items-center gap-2'>
            <div className='h-6 w-6 bg-yellow-500' />
            <span>
              Moderate Traffic
            </span>
          </p>

          <p className='flex items-center gap-2'>
            <div className='h-6 w-6 bg-green-500' />

            <span>
              Light Traffic
            </span>
          </p>

          <p className='flex items-center gap-2'>
            <div className='h-6 w-6 bg-red-500' />

            <span>
              Heavy Traffic
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
