import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};
const categories = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];
export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    return (
      <div className="categories ">
        <ul>
          {categories.map((categoryName, index) => {
            return (
              <li
                key={index}
                onClick={() => onClickCategory(index)}
                className={value === index ? "active" : ""}
              >
                {categoryName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
