"use client";
import { useEffect, useState } from "react";

export default function Home() {
  interface User {
    name: string;
    email: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <div>
          <li>{user.name}</li>
          <li>{user.email}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
