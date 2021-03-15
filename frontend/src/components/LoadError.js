import './LoadError.css';

export default function LoadError({ error }) {
  let errorType =
    error.name === 'HTTPError' &&
    error.response &&
    error.response.status === 404
      ? 'NotFound'
      : 'Unknown';

  return (
    <div class="load-error">
      {errorType === 'NotFound'
        ? 'Hmm, ezzel az azonosítóval nem találtuk meg az adataidat. Biztos jó linket használtál?'
        : 'Ehh, hiba történt. Próbáld meg légyszi újra!'}
    </div>
  );
}
