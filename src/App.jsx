import { useState, useEffect } from 'react';
import Fact from './Fact';
import CATEGORIES from './constants';
import './style.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  const handleShareBtn = () => {
    setShowForm(show => !show);
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="logo">
            <img src="logo.png" alt="Today I Learned Logo" />
            <h1>Today I Learned</h1>
          </div>

          <button className="btn btn-large btn-share" onClick={handleShareBtn}>
            {showForm ? 'Close' : 'Share a fact'}
          </button>
        </header>
        <form className={`fact-form ${showForm ? '' : 'hidden'}`}>
          <input type="text" placeholder="Share a fact with the world..." />
          <span>200</span>
          <input type="text" placeholder="Trustworthy source..." />
          <select>
            <option value="">Choose category:</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="finance">Finance</option>
          </select>
          <button class="btn btn-large">Post</button>
        </form>

        <main className="main">
          <aside>
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
          </aside>

          <section>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className="facts-list">
                {facts.length > 0 ? (
                  facts.map(fact => <Fact key={fact.id} fact={fact} />)
                ) : (
                  <p>No facts for this category yet! Create the first one!</p>
                )}
              </ul>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
