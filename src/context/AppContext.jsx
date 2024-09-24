import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [compressions, setCompressions] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchCompressions()
  }, [])

  const fetchCompressions = async () => {
    try {
      const res = await fetch('/api/compressions')
      console.log(res.ok)
      if(res.ok) {
        const data = await res.json()
        setCompressions(data)
      } else {
        console.log('Error fetching compressions', res.statusText)
      }
    } catch (error) {
      console.log('Error fetching compressions', error)
    }
  }

  const compressFile = async (file, id = null) => {
    setResult(null) // Reset the result state
  
    if (id) {
      await runSingleCompression(file, id)
    } else {
      for (let key in compressions) {
        if (compressions.hasOwnProperty(key)) {
          await runSingleCompression(file, key)
        }
      }
    }
  }
  
  const runSingleCompression = async (file, id) => {
    const formData = new FormData()
    formData.append('file', file)
  
    try {
      const res = await fetch(`/api/compression/${id}`, {
        method: 'POST',
        body: formData
      })
  
      if (res.ok) {
        const data = await res.json()
        setResult(prevResult => ({
          ...prevResult,
          [id]: data
        }))
      } else {
        console.log('File upload failed', res.statusText)
      }
  
    } catch (error) {
      console.log('Error uploading file', error)
    }
  }
  

  


  return (
    <AppContext.Provider
      value={{
        compressions,
        result,
        compressFile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
