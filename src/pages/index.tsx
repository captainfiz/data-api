import React, { useState, ChangeEvent } from "react";
import List from './components/list';

type User = {
  name: string;
  email: string;
};

export default function ContactForm() {
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.name || !user.email) {
      setMessage("Both fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    setLoading(false);

    if (res.ok) {
      setMessage("Contact added successfully!");
      setUser({ name: "", email: "" });
    } else {
      const errorData = await res.json();
      setMessage(errorData?.message || "Failed to add contact.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white shadow rounded p-4">
        <List />
        <h2 className="text-xl font-bold mb-2">Add Contact</h2>
        <input
          value={user.name}
          onChange={(e) => handleInputChange(e, "name")}
          placeholder="Name"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          value={user.email}
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
