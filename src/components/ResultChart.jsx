import { useContext } from 'react';
import AppContext from '../context/AppContext';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell
} from 'recharts';

const CompressionResultsChart = () => {
  const {result} = useContext(AppContext);

  console.log(result)
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black border border-gray-300 p-2 rounded shadow-lg">
          <p className="font-bold">{payload[0].name}</p>
          <p>{`Memory Usage: ${payload[0].value} bytes`}</p>
        </div>
      );
    }
    return null;
  };
  

  return result && (
    <div className="py-8 flex flex-col gap-5 items-center max-w-screen-md mx-auto text-white">
      <h3>Compressed Size (KB)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={result}>
          <XAxis dataKey="label" className='hidden md:block'/>
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* Custom Legend */}
          {/* <Legend /> */}
          <Bar dataKey="size.after">
            {result.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h3>Memory Usage (KB)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={result}>
          <XAxis dataKey="label" className='hidden md:block '/>
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          {/* <Legend/> */}
          <Bar dataKey="memory.usage" name="Memory Usage">
            {result.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} className='hover:text-red-600'/>
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h3>Time Elapsed (ms)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={result}>
          <XAxis dataKey="label" className='hidden md:block'/>
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          {/* <Legend /> */}
          <Bar dataKey="time.elapsed">
          {result.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompressionResultsChart;
