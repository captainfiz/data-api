// pages/list.tsx
import { useEffect, useState } from "react";

interface Item {
  id: number;
  title: string;
  url: string;
}

export default function List() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch data from API
    fetch("/api/banner")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Image List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={item.url}
                alt={item.title}
                style={{ width: "150px", height: "150px" }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
