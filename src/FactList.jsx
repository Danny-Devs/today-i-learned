import Fact from './Fact';

function FactList({ facts }) {
  return (
      <section>
        <ul className="facts-list">
          {facts.length > 0 ? (
            facts.map(fact => <Fact key={fact.id} fact={fact} />)
          ) : (
            <p>No facts for this category yet! Create the first one!</p>
          )}
        </ul>
      </section>
  );
}

export default FactList;
