"use client";

import { useEffect, useState } from "react";

export default function useFetchFile(fileName: string) {
  const [data, setData] = useState<null | []>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fileName) return;

    const fetchFile = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/data?file=${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileName]);

  return { data, error, loading };
}
