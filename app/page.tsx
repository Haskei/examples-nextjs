"use client";

import { useState, useEffect } from "react";
import Item from "../components/Items";
import "./globals.css";

export default function Home() {
  const [lista, set_item] = useState([]);
  const [novo_item, set_novo] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("/api/lista");
    const data = await response.json();
    set_item(Array.isArray(data) ? data : []);
  };

  const add_item = async () => {
    const response = await fetch("/api/lista", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: novo_item, completed: false }),
    });
    const data = await response.json();
    set_item([...lista, data]);
    set_novo("");
  };

  const delete_item = async (id) => {
    await fetch(`/api/lista/${id}`, { method: "DELETE" });
    set_item(lista.filter((item) => item.id !== id));
  };

  const toggle_item = async (id) => {
    const item = lista.find((item) => item.id === id);
    const updatedTask = { ...item, completed: !item.feito };
    const response = await fetch(`/api/lista/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    set_item(lista.map((item) => (item.id === id ? data : item)));
  };

  return (
    <div className="container">
      <h1>TODO List</h1>
      <input
        type="text"
        value={novo_item}
        onChange={(e) => set_novo(e.target.value)}
        placeholder="Escreva nova tarefa aqui"
      />
      <button onClick={add_item}>Adicionar Tarefa</button>
      <div>
        {Array.isArray(lista) &&
          lista.map((item) => (
            <Item
              key={item.id}
              item={item}
              onDelete={delete_item}
              onToggle={toggle_item}
            />
          ))}
      </div>
    </div>
  );
}
