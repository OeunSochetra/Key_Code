import React, { useEffect, useState } from "react";

function MyComponent() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return <div>{data && <p>{data}</p>}</div>;
}
