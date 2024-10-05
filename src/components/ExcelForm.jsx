import { useState, useContext } from "react"
import AppContext from "../context/AppContext"

const ExcelForm = () => {
	const { compressFile } = useContext(AppContext)
	const [file, setFile] = useState(null)
	const [error, setError] = useState(null)
	const allowedTypes = [
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/vnd.ms-excel",
	]

	const handleUpload = (event) => {
		event.preventDefault()

		if (!file) {
			setError("Please select a file to upload.")
			return
		}

		if (!allowedTypes.includes(file.type)) {
			setError("Invalid file type. Please select an Excel file.")
			return
		}

		setError(null)
		compressFile(file)
	}

	// Helper function to format file size
	const formatFileSize = (size) => {
		if (size < 1024) return `${size} bytes`
		else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`
		else return `${(size / 1048576).toFixed(2)} MB`
	}

	return (
		<div className="bg-slate-900 p-6 rounded-lg shadow-md">
			<form onSubmit={handleUpload} className="space-y-6 flex">
				<div className="flex flex-col w-3/4 mr-6">
					<label className="text-gray-200 mb-1">Select File:</label>
					<input
						type="file"
						onChange={(e) => setFile(e.target.files[0])}
						accept=".xlsx,.xls"
						className="block w-full text-gray-200 bg-slate-700 border border-slate-600 rounded-md p-2 focus:outline-none focus:border-slate-500 cursor-pointer"
					/>
				</div>

				<button
					type="submit"
					className="w-1/4 bg-slate-600 text-gray-100 py-2 px-4 rounded-md hover:bg-slate-500 transition-colors duration-200">
					Compress
				</button>
			</form>
			{error && <div className="text-red-500 mt-4">{error}</div>}
			{file && (
				<div className="text-gray-400 mt-2">
					Uncompressed size:{" "}
					<strong className="text-white">{formatFileSize(file.size)}</strong>
				</div>
			)}
		</div>
	)
}
export default ExcelForm
