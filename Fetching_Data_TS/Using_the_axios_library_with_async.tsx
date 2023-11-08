import React, { useEffect, useState } from "react";
import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get("https://api.example.com/data");
    return response.data;
  } catch (error) {
    throw error;
  }
}

function MyComponent() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchData()
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return <div>{data && <p>{data}</p>}</div>;
}
