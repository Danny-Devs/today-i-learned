import { useState } from 'react';
import CATEGORIES from '../../utils/constants';
import Modal from '../ui/Modal';

function NewFactForm({ showForm, onPostFact, setFacts }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const prepareUrl = url => {
    // Remove any leading/trailing whitespace
    url = url.trim();

    // If it already has a protocol, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // Add https:// if no protocol is present
    return `https://${url}`;
  };

  const isValidDomain = domain => {
    // Basic domain validation regex
    // Matches: example.com, sub.example.com, www.example.co.uk, etc.
    const domainRegex =
      /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

    try {
      // Remove protocol and path if present
      const url = new URL(
        domain.startsWith('http') ? domain : `https://${domain}`
      );
      return domainRegex.test(url.hostname);
    } catch {
      return domainRegex.test(domain);
    }
  };

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

    // First check if it's a valid domain
    if (!isValidDomain(source)) {
      setModalMessage(
        'Please enter a valid website address (e.g., wikipedia.org or bbc.com)'
      );
      return;
    }

    // Then prepare the URL
    const preparedUrl = prepareUrl(source);

    if (!category) {
      setModalMessage('Please select a category.');
      return;
    }

    try {
      const newFact = {
        text,
        source: preparedUrl,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0
      };

      const success = await setFacts(newFact);

      if (success) {
        // Reset the form
        setText('');
        setSource('');
        setCategory('');
        // Close the form
        onPostFact();
      } else {
        setModalMessage('Error adding fact. Please try again.');
      }
    } catch (error) {
      console.error('Insert error:', error);
      setModalMessage('Error adding fact. Please try again.');
    }
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
        placeholder="Trustworthy source... (e.g., wikipedia.org)"
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
      <button className="btn btn-large">Post</button>
      {modalMessage && (
        <Modal
          message={modalMessage}
          onClose={() => setModalMessage('')}
          type="info"
        />
      )}
    </form>
  );
}

export default NewFactForm;
