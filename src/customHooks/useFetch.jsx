import { useEffect, useState } from "react";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const useFetch = ({ url, options }) => {
  const [apiData, setApiData] = useState(null); // Default to null instead of empty array
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setApiStatus(apiStatusConstants.inProgress);
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          mode: "cors",
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const result = await response.json();
        setApiData(result ?? []);
        setApiStatus(apiStatusConstants.success);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setApiStatus(apiStatusConstants.failure);
        }
      }
    };

    fetchData();
    return () => controller.abort(); // Cleanup request on dependency change
  }, [url]);

  return { apiData, apiStatus, error };
};

export default useFetch;




