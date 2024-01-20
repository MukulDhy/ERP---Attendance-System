import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, body,) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {

        const config = {headers : {"Content-Type" : "application/json"}};
        const response = await axios.get(url,body,config);
        const data = await response?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setApiError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url,body]);

  return { isLoading, apiData, apiError };
};

export default useFetch;