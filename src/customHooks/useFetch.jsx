import React, { useEffect, useState, useCallback } from "react";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const useFetch = ({ url, options }) => {
  const [apiData, setApiData] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();

    try {
      setApiStatus(apiStatusConstants.inProgress);
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      setApiData(result ?? []);
      setApiStatus(apiStatusConstants.success);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
        setApiStatus(apiStatusConstants.failure);
      }
    } finally {
      controller.abort();
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { apiData, apiStatus, error, refetch: fetchData };
};

export default useFetch;
