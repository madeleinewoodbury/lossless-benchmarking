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
  const compressionResults = [
    {
        technique: "Run Length Encoding",
        label: "RLE",
        compressed_data: { /* simulated compressed data */ },
        time: { elapsed: 0.1, unit: 'seconds' },
        memory: { usage: 3000, unit: 'bytes' },
        size: { before: 100000, after: 50000, unit: 'bytes' }
    },
    {
        technique: "Huffman Compression",
        label: "Huffman",
        compressed_data: { /* simulated compressed data */ },
        time: { elapsed: 0.15, unit: 'seconds' },
        memory: { usage: 2500, unit: 'bytes' },
        size: { before: 100000, after: 40000, unit: 'bytes' }
    },
    {
        technique: "Arithmetic Compression",
        label: "Arithmetic",
        compressed_data: { /* simulated compressed data */ },
        time: { elapsed: 0.2, unit: 'seconds' },
        memory: { usage: 3500, unit: 'bytes' },
        size: { before: 100000, after: 45000, unit: 'bytes' }
    },
    {
        technique: "Cabac Compression",
        label: "Cabac",
        compressed_data: { /* simulated compressed data */ },
        time: { elapsed: 0.25, unit: 'seconds' },
        memory: { usage: 2800, unit: 'bytes' },
        size: { before: 100000, after: 42000, unit: 'bytes' }
    },
    {
        technique: "RLE and Huffman Compression",
        label: "RLE + Huffman",
        compressed_data: { /* simulated compressed data */ },
        time: { elapsed: 0.18, unit: 'seconds' },
        memory: { usage: 3200, unit: 'bytes' },
        size: { before: 100000, after: 38000, unit: 'bytes' }
    }
];

  const techniqueColors = {
    "Run Length Encoding": "#8884d8",
    "Huffman Compression": "#82ca9d",
    "Arithmetic Compression": "#ffc658",
    "Cabac Compression": "#ff8042",
    "RLE and Huffman Compression": "#00C49F",
  };
  

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
  

  return (
    <div className="py-8 flex flex-col gap-5 items-center max-w-screen-md mx-auto text-white">
      <h3>Compressed Size (bytes)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={compressionResults}>
          <XAxis dataKey="label" className='hidden md:block'/>
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* Custom Legend */}
          {/* <Legend /> */}
          <Bar dataKey="size.after">
            {compressionResults.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={techniqueColors[entry.technique]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h3>Memory Usage (bytes)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={compressionResults}>
          <XAxis dataKey="label" className='hidden md:block '/>
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          {/* <Legend/> */}
          <Bar dataKey="memory.usage" name="Memory Usage">
            {compressionResults.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={techniqueColors[entry.technique]} className='hover:text-red-600'/>
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h3>Time Elapsed (seconds)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={compressionResults}>
          <XAxis dataKey="label" className='hidden md:block'/>
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          {/* <Legend /> */}
          <Bar dataKey="time.elapsed">
          {compressionResults.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={techniqueColors[entry.technique]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompressionResultsChart;
