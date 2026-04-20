import { useState } from "react";
import type { Item } from "@/types/index";
import styles from "./Items.module.css";

function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [nextId, setNextId] = useState(1);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsedPrice = Number.parseFloat(price);
    if (!name.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) return;

    setItems((prev) => [...prev, { id: nextId, name: name.trim(), price: parsedPrice }]);
    setNextId((prev) => prev + 1);
    setName("");
    setPrice("");
  }

  function handleRemove(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className={styles.items}>
      <h1>Items</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit">Add</button>
      </form>

      {items.length === 0 ? (
        <p className={styles.empty}>No items yet. Add one above!</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <span>
                {item.name} — ${item.price.toFixed(2)}
              </span>
              <button type="button" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Items;
