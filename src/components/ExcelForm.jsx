import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

const ExcelForm = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      alert(error)
      setError(null)
    }
  }, [error])

  const handleUpload = (event) => {
    event.preventDefault()

    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please select an Excel file.')
      return
    }

    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result) 
      const workbook = XLSX.read(data, { type: 'array' }) 
      workbook.SheetNames.forEach(sheetName => {
        const rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        console.log('Sheet Name:', sheetName)
        console.log('Row Object:', rowObject)
      })
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <form onSubmit={handleUpload} className='text-white'>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} accept='.xlsx .xls'/>
      <button type="submit">Upload</button>
    </form>
  )
}
export default ExcelForm