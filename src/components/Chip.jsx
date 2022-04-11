export const Chip = ({ category, selectedCategory, setSelectedCategory }) => {
  return (
    <div
      className={`chip ${selectedCategory === category ? "chip-active" : ""} m-v-2 m-h-1 cursor`}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </div>
  );
};
