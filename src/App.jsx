import { useState, useEffect } from 'react';
import FactList from './FactList';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import './style.css';

function App() {
  const appTitle = 'Today I Learned';
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFacts() {
      try {
        const url = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/facts';

        const res = await fetch(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          }
        });

        const text = await res.text(); // Get raw response first

        try {
          const data = JSON.parse(text);
          setFacts(data);
        } catch (e) {
          console.error('Failed to parse JSON:', e);
        }
      } catch (error) {
        console.error('Error fetching facts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getFacts();
  }, []);

  return (
    <>
      <div className="container">
        <Header title={appTitle} />
        <main className="main">
        <aside>
          <CategoryFilter />
        </aside>
          <FactList facts={facts} />
        </main>
      </div>
    </>
  );
}

export default App;
