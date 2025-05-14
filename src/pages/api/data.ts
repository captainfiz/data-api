import type { NextApiRequest, NextApiResponse } from "next";

const MONGODB_DATA_API_URL = "https://data.mongodb-api.com/app/data-wjfpr/endpoint/data/beta/action";
const MONGODB_API_KEY = "JI7nznWcSDKLZjc8Krp6rfsiUbKfmk4roLdJiM6Bo7f76oOwSFwiPNMwTTdl28am";

type User = {
  name: string;
  email: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email } = req.body as User;

      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }

      const response = await fetch(`${MONGODB_DATA_API_URL}/insertOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": MONGODB_API_KEY,
        },
        body: JSON.stringify({
          collection: "users",
          database: "company-b",
          dataSource: "Cluster0",
          document: { name, email },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error adding contact:", result);
        return res.status(500).json({ message: "Failed to add contact", error: result });
      }

      res.status(201).json({ message: "Contact added successfully", data: result });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding contact:", error.message);
        res.status(500).json({ message: "Failed to add contact", error: error.message });
      } else {
        console.error("Unknown error adding contact:", error);
        res.status(500).json({ message: "Failed to add contact", error: "Unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
