import { useState } from 'react';
import CATEGORIES from '../../utils/constants';
import Modal from '../ui/Modal';

function Fact({ fact, onDeleteFact, onVote }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [votedTypes, setVotedTypes] = useState({
    votesInteresting: false,
    votesMindblowing: false,
    votesFalse: false
  });

  const category = CATEGORIES.find(c => c.name === fact.category);

  const handleVoteClick = columnName => {
    setVotedTypes(prev => ({ ...prev, [columnName]: true }));
    onVote(fact.id, columnName);
  };

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
        <button
          onClick={() => handleVoteClick('votesInteresting')}
          disabled={votedTypes.votesInteresting}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVoteClick('votesMindblowing')}
          disabled={votedTypes.votesMindblowing}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button
          onClick={() => handleVoteClick('votesFalse')}
          disabled={votedTypes.votesFalse}
        >
          ⛔️ {fact.votesFalse}
        </button>
        <button className="btn btn-x" onClick={() => setShowDeleteModal(true)}>
          ❌
        </button>
      </div>

      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this fact?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => onDeleteFact(fact.id)}
          type="confirm"
        />
      )}
    </li>
  );
}

export default Fact;
