"use client";

export default function Item({ item, onDelete, onToggle }) {
  return (
    <div className={`item ${item.feito ? "item_feito" : ""}`}>
      <input
        type="checkbox"
        checked={item.feito}
        onChange={() => onToggle(item.id)}
      />
      <span>{item.desc}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
}
