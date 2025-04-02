function Header({ showForm, onToggleForm }) {
  const appTitle = 'Today I Learned';

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Today I Learned Logo" />
          <h1>{appTitle}</h1>
        </div>

        <button className="btn btn-large btn-share" onClick={onToggleForm}>
          {showForm ? 'Close' : 'Share a fact'}
        </button>
      </header>
    </>
  );
}

export default Header;
