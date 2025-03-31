import CATEGORIES from './constants';

function Fact({ fact }) {
  const category = CATEGORIES.find(c => c.name === fact.category);

  return (
    <li className="fact">
      <p>{fact.text}</p>
    </li>
  );
}

export default Fact;