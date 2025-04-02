import { useState, useEffect } from 'react';
import FactList from './FactList';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import NewFactForm from './NewFactForm';
import supabase from './supabase';
import './style.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFacts() {
      console.log('Fetching facts...');
      const { data, error } = await supabase
        .from('facts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
        return;
      }

      console.log('Fetched facts:', data);
      setFacts(data);
      setIsLoading(false);
    }

    getFacts();
  }, []);

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
        <aside>
          <CategoryFilter />
        </aside>
        <FactList facts={facts} />
      </main>
    </div>
  );
}

export default App;
