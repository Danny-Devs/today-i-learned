import CATEGORIES from './utils/constants';
import { useState } from 'react';
function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('All');

  function filterFacts(category) {
    setActiveCategory(category);
    console.log(activeCategory);
    // TODO: filter facts
    // style active category
  }

  return (
    <ul>
      <li className="category">
        <button className="btn btn-all-categories">All</button>
      </li>
      {CATEGORIES.map(category => (
        <li className="category" key={category.name}>
          <button
            className="btn btn-category"
            style={{ backgroundColor: category.color }}
            onClick={() => {
              filterFacts(category.name);
            }}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CategoryFilter;
