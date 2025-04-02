import CATEGORIES from '../../utils/constants';

function CategoryFilter({ onSelectCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => onSelectCategory('All')}
          >
            All
          </button>
        </li>
        {CATEGORIES.map(category => (
          <li className="category" key={category.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: category.color }}
              onClick={() => {
                onSelectCategory(category.name);
              }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
