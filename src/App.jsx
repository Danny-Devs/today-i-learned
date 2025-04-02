import { useState, useEffect, useCallback } from 'react';
import FactList from './FactList';
import Loader from './components/Loader';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import NewFactForm from './NewFactForm';
import supabase from './supabase';
import './style.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [error, setError] = useState(null);

  const getFacts = useCallback(async category => {
    setIsLoading(true);
    setCurrentCategory(category);

    const { data, error } = await supabase
      .from('facts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Fetch error:', error);
      setError(error.message);
      return;
    }

    // Filter in memory for specific categories
    const filteredFacts =
      category === 'All'
        ? data
        : data.filter(fact => fact.category === category);

    setFacts(filteredFacts);
    setIsLoading(false);
  }, []);

  const deleteFact = useCallback(
    async id => {
      const { data, error } = await supabase
        .from('facts')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('Delete error:', error);
        return;
      }

      await getFacts(currentCategory);
    },
    [getFacts, currentCategory]
  );

  useEffect(() => {
    setIsLoading(true);
    getFacts(currentCategory);
  }, [getFacts, currentCategory]);

  const handleToggleForm = () => {
    setShowForm(show => !show);
  };

  return (
    <div className="container">
      <Header showForm={showForm} onToggleForm={handleToggleForm} />
      <NewFactForm
        showForm={showForm}
        onPostFact={handleToggleForm}
        setFacts={setFacts}
      />
      <main className="main">
        <CategoryFilter onSelectCategory={getFacts} />
        {error ? (
          <p className="error">Error loading facts: {error}</p>
        ) : isLoading ? (
          <Loader />
        ) : (
          <FactList
            facts={facts}
            currentCategory={currentCategory}
            onDeleteFact={deleteFact}
          />
        )}
      </main>
    </div>
  );
}

export default App;
