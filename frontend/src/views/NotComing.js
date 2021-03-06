export default function NotComing({ pageData }) {
  return (
    <div>
      Nagyon sajnáljuk, hogy nem {pageData.isPlural ? 'fogtok' : 'fogsz'} tudni
      jönni! Ha mégis úgy alakul, hogy el tudtok jönni akkor kérlek{' '}
      {pageData.isPlural ? 'jelezzétek' : 'jelezd'} legalább 2 héttel az esküvő
      előtt és ígérjük, szorítunk helyet{' '}
      {pageData.isPlural ? 'nekted' : 'neked'} 😊!
    </div>
  );
}
