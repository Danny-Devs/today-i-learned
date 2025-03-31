import CATEGORIES from './constants';

function CategoryFilter() {
  return (
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map(category => (
          <li className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
  );
}

export default CategoryFilter;
