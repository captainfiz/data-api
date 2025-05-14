import type { NextApiRequest, NextApiResponse } from "next";

const MONGODB_DATA_API_URL = "https://data.mongodb-api.com/app/data-wjfpr/endpoint/data/beta/action";
const MONGODB_API_KEY = "JI7nznWcSDKLZjc8Krp6rfsiUbKfmk4roLdJiM6Bo7f76oOwSFwiPNMwTTdl28am";

type Banner = {
  _id: string;
  title: string;
  imageUrl: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await fetch(`${MONGODB_DATA_API_URL}/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": MONGODB_API_KEY,
        },
        body: JSON.stringify({
          collection: "banners", // Ensure the collection name is correct
          database: "company-b", // Your database name
          dataSource: "Cluster0", // Your data source
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error fetching banners:", result);
        return res.status(500).json({ message: "Failed to fetch banners", error: result });
      }

      // Map over the result documents and return only necessary fields
      const banners: Banner[] = result?.documents.map((doc: any) => ({
        _id: doc._id["$oid"],
        title: doc.title,
        url: doc.url,
      }));

      res.status(200).json(banners);
    } catch (error: any) {
      console.error("Error fetching banners:", error);
      res.status(500).json({ message: "Failed to fetch banners", error: error.message });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: "Method not allowed" });
  }
}
