import { useState } from 'react';

function Header() {
  const [showForm, setShowForm] = useState(false);

  const handleShareBtn = () => {
    setShowForm(show => !show);
  };
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Today I Learned Logo" />
          <h1>Today I Learned</h1>
        </div>

        <button className="btn btn-large btn-share" onClick={handleShareBtn}>
          {showForm ? 'Close' : 'Share a fact'}
        </button>
      </header>
      <form className={`fact-form ${showForm ? '' : 'hidden'}`}>
        <input type="text" placeholder="Share a fact with the world..." />
        <span>200</span>
        <input type="text" placeholder="Trustworthy source..." />
        <select>
          <option value="">Choose category:</option>
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="finance">Finance</option>
        </select>
        <button class="btn btn-large">Post</button>
      </form>
    </>
  );
}

export default Header;
