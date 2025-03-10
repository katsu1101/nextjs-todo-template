"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      setTitle("");
      setTodos([...todos, await res.json()]);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">TODO List</h1>
      <div className="flex">
        <input
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2">
          追加
        </button>
      </div>
      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="border-b p-2">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
