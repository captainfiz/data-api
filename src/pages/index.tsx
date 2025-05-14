import React, { useState, ChangeEvent } from "react";
import List from './components/list'
type User = {
  name: string;
  email: string;
};

export default function ContactForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input change for name and email
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "name" | "email"
  ) => {
    const value = e.target.value;
    if (field === "name") {
      setName(value);
    } else {
      setEmail(value);
    }
  };

  // Handle form submission for adding a contact
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setMessage("Both fields are required.");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages

    const res = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    setLoading(false);

    if (res.ok) {
      setMessage("Contact added successfully!");
      setName("");
      setEmail("");
    } else {
      const errorData = await res.json();
      setMessage(errorData?.message || "Failed to add contact.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white shadow rounded p-4">
        <List/>
        <h2 className="text-xl font-bold mb-2">Add Contact</h2>
        <input
          value={name}
          onChange={(e) => handleInputChange(e, "name")}
          placeholder="Name"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          value={email}
          onChange={(e) => handleInputChange(e, "email")}
          placeholder="Email"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add"}
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
