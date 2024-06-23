import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackagingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onCheckItems={handleCheckItems}
        onClearList={clearList}
      />
      <Stats numItems={numItems} numPackedItems={numPackedItems} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥳 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackagingList({ items, onDeleteItems, onCheckItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((itm) => (
          <Item
            item={itm}
            key={itm.id}
            onDeleteItems={onDeleteItems}
            onCheckItems={onCheckItems}
          />
        ))}
      </ul>

      <div className="Actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed items</option>
        </select>

        <button className="Actions" onClick={onClearList}>
          {" "}
          Clear the list
        </button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onCheckItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onCheckItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ numItems, numPackedItems }) {
  if (numItems === 0)
    return (
      <p className="stats">
        <em>Start by adding some items to the list 🚀</em>
      </p>
    );

  return (
    <footer className="stats">
      <em>
        💼 You have {numItems} items on your list, and you already packed{" "}
        {numPackedItems} ({Math.round((numPackedItems / numItems) * 100) || 0}%)
      </em>
    </footer>
  );
}
