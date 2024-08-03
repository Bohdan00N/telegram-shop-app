import React from "react";
import css from "./categories.module.scss";

const Categ = ({ activeCategory, onCategoryClick }) => {
  const categories = ["Усі", "Суші", "Напої"];

  return (
    <div className={css.categories}>
      {categories.map((category) => (
        <button
          key={category}
          className={activeCategory === category ? css.active : ""}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categ;
