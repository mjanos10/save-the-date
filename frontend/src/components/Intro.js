import './Intro.css';

export default function Intro({ people, peopleCount }) {
  function renderNames() {
    const nameList = [...people]; // not to mutate a prop with the .pop method later
    if (nameList.length === 1) {
      return nameList[0];
    }
    const last = nameList.pop();
    return `${nameList.join(', ')} és ${last}`;
  }

  const isPlural = peopleCount > 1;

  const text1 = `Szeretettel meghívunk ${
    isPlural ? 'Titeket' : 'Téged'
  } a 2021. 09. 03-án tartandó esküvőnkre a lajosmizsei Ezüst Villa Rendezvényházba!`;
  const text2 = `Hogy a jelenleginél kicsit felkészültebbek lehessünk, kérünk ${
    isPlural ? 'válaszoljatok' : 'válaszolj'
  } nekünk az alábbi kérdésekre, ezzel is növelve az esélyét, hogy vacsorához ${
    isPlural ? 'juthassatok' : 'juthass'
  }.`;
  return (
    <div className="intro">
      <div className="intro__text">
        <h2>Kedves {renderNames()}</h2>
        <p>{text1}</p>
        <p>{text2}</p>
        <p>U.i.: Már a meghívó is úton van!</p>
      </div>
    </div>
  );
}
