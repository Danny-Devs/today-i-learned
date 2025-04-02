import CATEGORIES from './utils/constants';
import supabase from './supabase';

function CategoryFilter({ setFacts, setIsLoading, setCurrentCategory }) {
  async function filterFacts(category) {
    setIsLoading(true); // Add loading state
    setCurrentCategory(category);
    
    const { data: facts, error } = await supabase
      .from('facts')
      .select('*')
      .eq(
        category === 'All' ? 'id' : 'category',
        category === 'All' ? 'id' : category
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching facts:', error);
      return;
    }

    setFacts(facts);
    setIsLoading(false); // End loading state
  }

  return (
    <aside>
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
    </aside>
  );
}

export default CategoryFilter;
