import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setData([]);
          setFetchError(err.message);
        }
      } finally {
        // Simulate a long loading time
        isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    }

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    }
    return cleanUp;
  }, [dataUrl])

  return { data, isLoading, fetchError };
}
 
export default useAxiosFetch;