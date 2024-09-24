import { useState, useContext} from 'react'
import AppContext from '../context/AppContext'

const ExcelForm = () => {
  const {compressFile} = useContext(AppContext)
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']

  const handleUpload = (event) => {
    event.preventDefault()

    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please select an Excel file.')
      return
    }

    setError(null)
    compressFile(file)
  }


  return (
    <div className="text-white p-4">  
      <form onSubmit={handleUpload} className='text-white'>
        <input type="file" onChange={e => setFile(e.target.files[0])} accept='.xlsx .xls'/>
        <button type="submit">Upload</button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
export default ExcelForm