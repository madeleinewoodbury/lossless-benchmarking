import { useContext, useState } from "react"
import AppContext from "../context/AppContext"

const ResultTable = () => {
	const { result } = useContext(AppContext)
	const [showData, setShowData] = useState(null)
	const [currentData, setCurrentData] = useState(null)

	const toggleCompressedData = (data, index) => {
		if (currentData === index) {
			setShowData(null)
			setCurrentData(null)
			return
		}

		setShowData(data)
		setCurrentData(index)
	}

	if (result.length === 0) return null

	return (
		<div className="flex flex-col items-center justify-center mt-8">
			<div className="w-full max-w-6xl">
				<table className="table-auto w-full border-collapse bg-slate-950 shadow-lg rounded-lg">
					<thead>
						<tr className="bg-slate-700 text-gray-100 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Technique</th>
							<th className="hidden py-3 px-6 text-center md:table-cell">
								Time
							</th>
							<th className="hidden py-3 px-6 text-center md:table-cell">
								Size
							</th>
							<th className="hidden py-3 px-6 text-center md:table-cell">
								Ratio
							</th>
							<th className="py-3 px-6 text-center"></th>
						</tr>
					</thead>
					<tbody className="text-gray-300 text-sm font-light">
						{result.map((data, index) => {
							const classes =
								currentData === index
									? "border-b border-gray-200 cursor-pointer bg-slate-900"
									: "border-b border-gray-200 cursor-pointer hover:bg-slate-900"
							return (
								<tr key={index} className={classes}>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										<span className="hidden font-medium sm:inline-block">
											{data.technique}
										</span>
										<span className="font-medium sm:hidden">
											{data.short_name}
										</span>
									</td>
									<td className="hidden py-3 px-6 text-center md:table-cell">
										{data.time.elapsed.toFixed(2)} {data.time.unit}
									</td>
									<td className="hidden py-3 px-6 text-center md:table-cell">
										{data.size.after.toFixed(2)} {data.size.unit}
									</td>
									<td className="hidden py-3 px-6 text-center md:table-cell">
										{data.compression_ratio.toFixed(6)}
									</td>

									<td className="py-3 px-6 text-center">
										{currentData === index ? (
											<button
												onClick={() => toggleCompressedData(data, index)}
												className="bg-gradient-to-r from-red-700 to-red-800 text-white py-1 px-3 rounded hover:bg-gradient-to-r hover:from-red-700 hover:to-red-700 transition-colors">
												Hide Data
											</button>
										) : (
											<button
												onClick={() => toggleCompressedData(data, index)}
												className="bg-gradient-to-r from-slate-500 to-slate-600 text-white py-1 px-3 rounded hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-600 transition-colors">
												View Data
											</button>
										)}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>

				{showData !== null && (
					<div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg relative">
						<h3 className="text-lg font-bold mb-4">
							{showData.technique} - Compressed Data
						</h3>
						<pre className="bg-gray-200 p-2 rounded-lg overflow-auto text-sm text-gray-800">
							{Object.keys(showData.compressed_data).map((key) => {
								const value = showData.compressed_data[key]
								const displayValue =
									value.length > 50 ? `${value.slice(0, 100)}...` : value
								return (
									<div key={key}>
										<span className="font-semibold">{key}:</span>
										{displayValue}
									</div>
								)
							})}
						</pre>
					</div>
				)}
			</div>
		</div>
	)
}
export default ResultTable
