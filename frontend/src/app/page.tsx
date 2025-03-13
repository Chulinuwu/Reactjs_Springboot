"use client";
import { useEffect, useState } from "react";

export default function Home() {
  interface User {
    name: string;
    email: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const addUser = async () => {
    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }

    const newUser = { name, email };

    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      setName("");
      setEmail("");
      fetchUsers();
    } else {
      alert("Failed to add user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-md mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md mr-2"
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <ul className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        {users.map((user, index) => (
          <li key={index} className="border-b p-2">
            <span className="font-semibold">{user.name}</span> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
