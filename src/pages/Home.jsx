import { useContext } from "react"
import AppContext from "../context/AppContext"
import ExcelForm from "../components/ExcelForm"
import ResultChart from "../components/ResultChart"
import ResultTable from "../components/ResultTable"
import Spinner from "../components/Spinner"

const Home = () => {
	const { loadingData } = useContext(AppContext)

	return (
		<div>
			<h1 className="text-white pt-8 pb-6 text-3xl text-center">
				Excel File Compression Benchmarking
			</h1>
			<ExcelForm />
			<ResultTable />
			{loadingData ? <Spinner loadingData={loadingData} /> : <ResultChart />}
		</div>
	)
}
export default Home
