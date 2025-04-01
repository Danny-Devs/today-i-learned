import CATEGORIES from './utils/constants';

function NewFactForm({ showForm }) {
  return (
    <form className={`fact-form ${showForm ? '' : 'hidden'}`}>
      <input type="text" placeholder="Share a fact with the world..." />
      <span>200</span>
      <input type="text" placeholder="Trustworthy source..." />
      <select>
      <option value="">Choose category:</option>
      {CATEGORIES.map(category => (
        <option value={category.name} key={category.name}>
          {category.name}
        </option>
      ))}
    </select>
      <button class="btn btn-large">Post</button>
    </form>
  );
}

export default NewFactForm;
