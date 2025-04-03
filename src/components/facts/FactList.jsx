import { useState } from 'react';
import Fact from './Fact';

function FactList({ facts, currentCategory, onDeleteFact, onVote }) {
  const [sortBy, setSortBy] = useState('newest');

  const getSortedFacts = () => {
    const sortedFacts = [...facts];

    switch (sortBy) {
      case 'oldest':
        return sortedFacts.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      case 'mostTrusted':
        return sortedFacts.sort((a, b) => a.votesFalse - b.votesFalse);
      case 'leastTrusted':
        return sortedFacts.sort((a, b) => b.votesFalse - a.votesFalse);
      case 'newest':
      default:
        return sortedFacts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }
  };

  return (
    <section>
      <div className="facts-sort">
        <span>Sort by: </span>
        <button
          className={`btn-sort ${sortBy === 'newest' ? 'active' : ''}`}
          onClick={() => setSortBy('newest')}
        >
          Newest
        </button>
        <button
          className={`btn-sort ${sortBy === 'oldest' ? 'active' : ''}`}
          onClick={() => setSortBy('oldest')}
        >
          Oldest
        </button>
        <button
          className={`btn-sort ${sortBy === 'mostTrusted' ? 'active' : ''}`}
          onClick={() => setSortBy('mostTrusted')}
        >
          Most Trusted
        </button>
        <button
          className={`btn-sort ${sortBy === 'leastTrusted' ? 'active' : ''}`}
          onClick={() => setSortBy('leastTrusted')}
        >
          Disputed
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
