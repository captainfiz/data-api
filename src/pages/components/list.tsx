// pages/list.tsx
import { useEffect, useState } from "react";
import Image from "next/image";

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
              <Image
                src={item.url}
                alt={item.title}
                width={150}
                height={150}
                priority={false} // Change to true if you want to prioritize loading
                style={{ objectFit: "cover" }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
