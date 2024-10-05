import { createContext, useState, useEffect } from "react"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
	const [compressions, setCompressions] = useState([])
	const [result, setResult] = useState([])
	const [loadingData, setLoadingData] = useState(null)

	useEffect(() => {
		fetchCompressions()
	}, [])

	const fetchCompressions = async () => {
		try {
			const res = await fetch("/api/compressions")
			if (res.ok) {
				const data = await res.json()
				setCompressions(data)
			} else {
				console.log("Error fetching compressions", res.statusText)
			}
		} catch (error) {
			console.log("Error fetching compressions", error)
		}
	}

	const compressFile = async (file, id = null) => {
		setResult([]) // Reset the result state
		if (id) {
			setLoadingData(`Running ${compressions[id]}`)
			await runSingleCompression(file, id)
		} else {
			for (let key in compressions) {
				if (compressions.hasOwnProperty(key)) {
					setLoadingData(`Running ${compressions[key]}`)
					await runSingleCompression(file, key)
				}
			}
		}

		setLoadingData(null)
	}

	const runSingleCompression = async (file, id) => {
		const formData = new FormData()
		formData.append("file", file)

		try {
			const res = await fetch(`/api/compression/${id}`, {
				method: "POST",
				body: formData,
			})

			if (res.ok) {
				const data = await res.json()
				setResult((prevResult) => [...prevResult, data])
			} else {
				console.log("File upload failed", res.statusText)
			}
		} catch (error) {
			console.log("Error uploading file", error)
		}
	}

	return (
		<AppContext.Provider
			value={{
				compressions,
				result,
				loadingData,
				compressFile,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext
