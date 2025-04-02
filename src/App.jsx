import { useState, useEffect } from 'react';
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

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      const { data: facts, error } = await supabase
        .from('facts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Fetch error:', error);
        return;
      }

      setFacts(facts);
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
        <CategoryFilter
          setFacts={setFacts}
          setIsLoading={setIsLoading}
          setCurrentCategory={setCurrentCategory}
        />
        {isLoading ? <Loader /> : <FactList facts={facts} currentCategory={currentCategory} />}
      </main>
    </div>
  );
}

export default App;
