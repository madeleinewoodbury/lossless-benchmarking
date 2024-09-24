import ExcelForm from "../components/ExcelForm"
import ResultChart from "../components/ResultChart"
import ResultTable from "../components/ResultTable"

const Home = () => {
  return (
    <div>
      <h1 className="text-white">Excel Upload</h1>
      <ExcelForm />
      <ResultTable />
      <ResultChart />
    </div>
  )
}
export default Home