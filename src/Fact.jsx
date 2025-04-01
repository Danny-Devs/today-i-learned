import CATEGORIES from './utils/constants';

function Fact({ fact }) {
  const category = CATEGORIES.find(c => c.name === fact.category);

  return (
    <li className="fact">
      <p>
        {fact.text}{' '}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          (Source)
        </a>
      </p>
      <span className="tag" style={{ backgroundColor: category.color }}>
        {category.name}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default Fact;
