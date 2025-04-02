import { useState } from 'react';
import CATEGORIES from './utils/constants';
import Modal from './components/Modal';

 function NewFactForm({ showForm, onPostFact, setFacts }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [newFact, setNewFact] = useState(null);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    // Check if the form is valid
    if (!text) {
      setModalMessage('Please provide a fact');
      return;
    }
    if (!source) {
      setModalMessage('Please provide a source.');
      return;
    }
    try {
      // If URL doesn't start with http:// or https://, add https://
      const urlToCheck =
        source.startsWith('http://') || source.startsWith('https://')
          ? source
          : `https://${source}`;
      new URL(urlToCheck);
    } catch {
      setModalMessage('Please provide a valid URL.');
      return;
    }
    if (!category) {
      setModalMessage('Please select a category.');
      return;
    }

    // Create a new fact object
    setNewFact({
      id: crypto.randomUUID(),
      text,
      source,
      category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: new Date().getFullYear()
    });
    // Save the new fact to the database
    setFacts(facts => [newFact, ...facts]);

    // Reset the form
    setText('');
    setSource('');
    setCategory('');

    // Close the form
    onPostFact();
  };

  return (
    <form
      className={`fact-form ${showForm ? '' : 'hidden'}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength={200}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={e => setSource(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map(category => (
          <option value={category.name} key={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button class="btn btn-large">Post</button>
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage('')} />
      )}
    </form>
  );
}

export default NewFactForm;
