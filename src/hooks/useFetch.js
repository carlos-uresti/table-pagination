import { useState, useEffect } from "react";

const useFetch = (url, batch) => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading]= useState(false);

  useEffect(() => {
    
    async function callPage() {
      setIsLoading(true);
      const response = await fetch(url);
      const results = await response.json().then(setIsLoading(false));
      return setRows(await results);
    }

    callPage();

  }, [url, batch]);
  
  return { rows, isLoading };
};

export default useFetch;
