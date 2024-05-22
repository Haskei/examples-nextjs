"use client";

import { useState, useEffect } from "react";
import Item from "../components/Items";
import "./globals.css";

export default function Home() {
  const [lista, set_item] = useState([]);
  const [novo_item, set_novo] = useState("");

  useEffect(() => {
    Fetch_item();
  }, []);

  const Fetch_item = async () => {
    const response = await fetch("/api/lista");
    const data = await response.json();
    set_item(Array.isArray(data) ? data : []);
  };

  const add_item = async () => {
    const response = await fetch("/api/lista", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ desc: novo_item }),
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
    const update_item = { ...item, feito: !item.feito };
    const response = await fetch(`/api/lista/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update_item),
    });
    const data = await response.json();
    set_item(lista.map((item) => (item.id === id ? data : item)));
  };

  return (
    <div className="container">
      <h1>Lista</h1>
      <input
        type="text"
        value={novo_item}
        onChange={(e) => set_novo(e.target.value)}
        placeholder="Escreva nova tarefa aqui"
      />
      <button onClick={add_item}>Adicionar Item</button>
      <div>
        {Array.isArray(lista) &&
          lista.map((item) => (
            <Item
              key={item.id}
              item={item}
              onToggle={toggle_item}
              onDelete={delete_item}
            />
          ))}
      </div>
    </div>
  );
}
