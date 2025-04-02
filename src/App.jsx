import { useState, useEffect } from 'react';
import FactList from './components/facts/FactList';
import Loader from './components/ui/Loader';
import Header from './components/layout/Header';
import CategoryFilter from './components/facts/CategoryFilter';
import NewFactForm from './components/facts/NewFactForm';
import { useFactOperations } from './hooks/useFactOperations';
import './style.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const {
    facts,
    isLoading,
    error,
    currentCategory,
    getFacts,
    handleCreateFact,
    handleDeleteFact,
    handleVote
  } = useFactOperations();

  useEffect(() => {
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
        setFacts={handleCreateFact}
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
            onDeleteFact={handleDeleteFact}
            onVote={handleVote}
          />
        )}
      </main>
    </div>
  );
}

export default App;
