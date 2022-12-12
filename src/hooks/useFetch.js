import { useState, useEffect } from "react";

const useFetch = (url, batch) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function callPage() {
      console.log(url);
      const response = await fetch(url);
      const results = await response.json();
      return setRows(await results);
    }

    callPage();
  }, [url, batch]);

  return { rows };
};

export default useFetch;
