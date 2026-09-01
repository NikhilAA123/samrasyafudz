import type { Category } from "../api/types";
import "./CategoryFilter.css";

interface Props {
  categories: Category[];
  selected: number | null;
  onSelect: (id: number | null) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="category-filter">
      <button
        className={`category-pill ${selected === null ? "active" : ""}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          className={`category-pill ${selected === c.id ? "active" : ""}`}
          onClick={() => onSelect(c.id)}
        >
          {c.imageUrl && (
            <img className="category-pill-image" src={c.imageUrl} alt="" />
          )}
          {c.name}
        </button>
      ))}
    </div>
  );
}
