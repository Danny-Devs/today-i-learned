import { useState } from 'react';
import Fact from './Fact';

function FactList({ facts, currentCategory, onDeleteFact, onVote }) {
  const [sorts, setSorts] = useState({
    date: 'desc', // desc = newest first, asc = oldest first
    trust: null, // desc = most trusted, asc = disputed
    interesting: null, // desc = most interesting first
    mindblowing: null // desc = most mindblowing first
  });

  const toggleSort = type => {
    setSorts(prev => {
      // Reset all sorts
      const newSorts = {
        date: null,
        trust: null,
        interesting: null,
        mindblowing: null
      };

      // Toggle the clicked sort
      if (prev[type] === 'desc') {
        newSorts[type] = 'asc';
      } else if (prev[type] === 'asc' || prev[type] === null) {
        newSorts[type] = 'desc';
      }

      return newSorts;
    });
  };

  const getSortedFacts = () => {
    const sortedFacts = [...facts];

    // Apply active sort
    const activeSortType = Object.entries(sorts).find(
      ([, direction]) => direction
    )?.[0];
    const sortDirection = sorts[activeSortType];

    if (!activeSortType) return sortedFacts;

    switch (activeSortType) {
      case 'date':
        return sortedFacts.sort((a, b) => {
          const diff = new Date(b.created_at) - new Date(a.created_at);
          return sortDirection === 'desc' ? diff : -diff;
        });
      case 'trust':
        return sortedFacts.sort((a, b) => {
          const diff = a.votesFalse - b.votesFalse;
          return sortDirection === 'desc' ? diff : -diff;
        });
      case 'interesting':
        return sortedFacts.sort((a, b) => {
          const diff = b.votesInteresting - a.votesInteresting;
          return sortDirection === 'desc' ? diff : -diff;
        });
      case 'mindblowing':
        return sortedFacts.sort((a, b) => {
          const diff = b.votesMindblowing - a.votesMindblowing;
          return sortDirection === 'desc' ? diff : -diff;
        });
      default:
        return sortedFacts;
    }
  };

  const getSortIcon = type => {
    if (!sorts[type]) return '';
    return sorts[type] === 'desc' ? '↓' : '↑';
  };

  return (
    <section>
      <div className="facts-sort">
        <span>Sort by: </span>
        <button
          className={`btn-sort ${sorts.date ? 'active' : ''}`}
          onClick={() => toggleSort('date')}
        >
          Date {getSortIcon('date')}
        </button>
        <button
          className={`btn-sort ${sorts.trust ? 'active' : ''}`}
          onClick={() => toggleSort('trust')}
        >
          Trust {getSortIcon('trust')}
        </button>
        <button
          className={`btn-sort ${sorts.interesting ? 'active' : ''}`}
          onClick={() => toggleSort('interesting')}
        >
          Interesting {getSortIcon('interesting')}
        </button>
        <button
          className={`btn-sort ${sorts.mindblowing ? 'active' : ''}`}
          onClick={() => toggleSort('mindblowing')}
        >
          Mindblowing {getSortIcon('mindblowing')}
        </button>
      </div>

      <ul className="facts-list">
        {facts.length > 0 ? (
          <>
            {getSortedFacts().map(fact => (
              <Fact
                key={fact.id}
                fact={fact}
                onDeleteFact={onDeleteFact}
                onVote={onVote}
              />
            ))}
          </>
        ) : currentCategory === 'All' ? (
          <p>There are 0 facts in this list. Add your own!</p>
        ) : (
          <p>No facts for this category yet. Create the first one!</p>
        )}
      </ul>
    </section>
  );
}

export default FactList;
