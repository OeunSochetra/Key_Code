import React, { useEffect, useState } from "react";

async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
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
