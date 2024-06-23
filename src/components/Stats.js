export default function Stats({ numItems, numPackedItems }) {
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
