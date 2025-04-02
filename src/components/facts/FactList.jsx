import Fact from './Fact';

function FactList({ facts, currentCategory, onDeleteFact, onVote }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.length > 0 ? (
          <>
            {facts.map(fact => (
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
