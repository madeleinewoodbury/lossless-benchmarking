import { useContext } from 'react';
import AppContext from '../context/AppContext';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Cell
} from 'recharts';

const CompressionResultsChart = () => {
  const {result} = useContext(AppContext);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4'];

  if (result.length === 0) return null;

  const sizeTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const compressedSize = payload[0].payload.size.after;
      const displayCompressedSize = compressedSize === 0 ? 'N/A' : `${compressedSize.toFixed(3)} KB`;
      return (
        <div className="bg-black border border-gray-300 p-2 rounded shadow-lg">
          <p className="font-bold">{payload[0].payload.technique}</p>
          <p>{`Compressed Size: ${displayCompressedSize}`}</p>
        </div>
      );
    }
    return null;
  }

  const timeTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const timeElapsed = payload[0].payload.time.elapsed;
      const displayTimeElapsed = timeElapsed === 0 ? 'N/A' : `${timeElapsed.toFixed(3)} ms`;
      return (
        <div className="bg-black border border-gray-300 p-2 rounded shadow-lg">
          <p className="font-bold">{payload[0].payload.technique}</p>
          <p>{`Time Elapsed: ${displayTimeElapsed}`}</p>
        </div>
      );
    }
    return null;
  };

  const memoryTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const memoryUsage = payload[0].payload.memory.usage;
      const displayMemoryUsage = memoryUsage === 0 ? 'N/A' : `${memoryUsage} bytes`;
      return (
        <div className="bg-black border border-gray-300 p-2 rounded shadow-lg">
          <p className="font-bold">{payload[0].payload.technique}</p>
          <p>{`Memory Usage: ${displayMemoryUsage}`}</p>
        </div>
      );
    }
    return null;
  };



  return (
    <div className="py-12 flex flex-col items-center gap-y-8 max-w-screen-lg mx-auto text-white lg:flex-row lg:flex-wrap">
      <div className='w-full flex flex-col items-center lg:w-1/2'>
        <h3 className='text-xl pb-6'>Compressed Size (KB)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={result}>
            <XAxis dataKey="label" className='hidden md:block'/>
            <YAxis />
            <Tooltip content={sizeTooltip} />
            <Bar dataKey="size.after" name="Size in KB">
              {result.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
              <LabelList dataKey="short_name" position="bottom" offset={5}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='w-full flex flex-col items-center lg:w-1/2'>
        <h3 className='text-xl pb-6'>Time Elapsed (ms)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={result}>
            <XAxis dataKey="label" className='hidden md:block'/>
            <YAxis />
            <Tooltip content={timeTooltip}/>
            <Bar dataKey="time.elapsed" name="Time in ms">
            {result.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
              <LabelList dataKey="short_name" position="bottom" offset={5}/>
            </Bar>
          </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='w-full flex flex-col items-center lg:w-1/2'>
          <h3 className='text-xl pb-6'>Memory Usage (KB)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={result}>
              <XAxis dataKey="label" className='hidden md:block '/>
              <YAxis />
              <Tooltip content={memoryTooltip} />
              <Bar dataKey="memory.usage" name="Memory Usage">
                {result.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} className='hover:text-red-600'/>
                  ))}
              <LabelList dataKey="short_name" position="bottom" offset={5}/>  
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
};

export default CompressionResultsChart;
