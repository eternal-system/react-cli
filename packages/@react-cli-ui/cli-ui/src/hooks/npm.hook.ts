import { useState, useEffect, useCallback } from 'react'

export function useGetPackages(str: string) {
    const [packages, setResults] = useState([])

    async function fetchPackages(string) {

      const API = `https://api.npms.io/v2/search/suggestions${
        string ? `?q=${string}` : ''
      }`
  
      const res = await fetch(API, {
        headers: {
          Accept: 'application/json'
        }
      })
  
      const data = await res.json()
      setResults(data)
    }
  
    useEffect(() => {
      fetchPackages(str)
    }, [str])
   
    return {
      packages, 
      fetchPackages
    }
}