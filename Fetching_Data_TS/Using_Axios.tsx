import React, { useEffect, useState } from "react";
import axios from "axios";

function MyComponent() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("https://api.example.com/data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return <div>{data && <p>{data}</p>}</div>;
}
