import { useState } from "react";
import Item from "./Item";

export default function PackagingList({
  items,
  onDeleteItems,
  onCheckItems,
  onClearList,
}) {
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
