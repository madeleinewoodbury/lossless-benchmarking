import { useContext, useState } from "react"
import AppContext from "../context/AppContext";

const ResultTable = () => {
  const {result} = useContext(AppContext);
  const [showData, setShowData] = useState(null);


  const toggleCompressedData = (data) => {
    setShowData(data);
  };

  const displayCompressionData = (data) => {
   Object.keys(data.compressed_data).map((key) => {
    console.log(key, data.compressed_data[key]);
   })
  }


  return result && (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="w-full max-w-6xl">
        <table className="table-auto w-full border-collapse bg-slate-950 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-slate-700 text-gray-100 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Technique</th>
              <th className="py-3 px-6 text-left">Time Elapsed</th>
              <th className="py-3 px-6 text-left">Size</th>
              <th className="py-3 px-6 text-left">Memory</th>
              <th className="py-3 px-6 text-center"></th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {result.map((data, index) => (
              <tr key={index} className="border-b border-gray-200 cursor-pointer hover:bg-slate-900">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{data.technique}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  {data.time.elapsed.toFixed(3)} {data.time.unit}
                </td>
                <td className="py-3 px-6 text-left">
                  {data.size.after.toFixed(3)} {data.size.unit}
                </td>
                <td className="py-3 px-6 text-left">
                  {data.memory.usage} {data.memory.unit}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => toggleCompressedData(data)}
                    className="bg-gradient-to-r from-slate-500 to-slate-600 text-white py-1 px-3 rounded hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-600 transition-colors"
                  >
                    {showData === index ? 'Hide Data' : 'View Data'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showData !== null && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-bold mb-2">
              {showData.technique} - Compressed Data
            </h3>
            <pre className="bg-gray-200 p-2 rounded-lg overflow-auto text-sm text-gray-800">
              {Object.keys(showData.compressed_data).map((key) => {
                const value = showData.compressed_data[key];
                const displayValue = value.length > 50 ? `${value.slice(0, 100)}...` : value;
                return (
                  <div key={key}>
                    <span className="font-semibold">{key}:</span> 
                    {displayValue}
                  </div>
                );
            })}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
export default ResultTable