import { useState } from 'react';
import CATEGORIES from './utils/constants';
import Modal from './components/Modal';

function Fact({ fact, onDeleteFact }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
        <button
          className="btn btn-x"
          onClick={() => setShowDeleteModal(true)}
        >
          ❌
        </button>
      </div>

      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this fact?"
          onClose={() => setShowDeleteModal(false)}
          type="confirm"
        />
      )}
    </li>
  );
}

export default Fact;
