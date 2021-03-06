import './Intro.css';

const names = [
  'Fintan',
  'Lorenzo',
  'Karen',
  'Wesley',
  'Lachlan',
  'Omar',
  'Trey',
  'Ace',
  'Florence',
  'Julia',
];

export default function Intro({ people, peopleCount }) {
  function renderNames() {
    const nameList = localStorage.getItem('mock-api')
      ? Array.from({ length: peopleCount }).map((_, i) => names[i])
      : [...people];
    if (nameList.length === 1) {
      return nameList[0];
    }
    const last = nameList.pop();
    return `${nameList.join(', ')} és ${last}`;
  }

  return (
    <div className="intro">
      <h2>Kedves {renderNames()}</h2>
      Ez lesz majd az intrónk ahol köszöntünk mindenkit.
    </div>
  );
}
