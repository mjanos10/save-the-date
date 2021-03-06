export default function Select({ id, value, options, onChange }) {
  return (
    <select id={id} value={value} onChange={onChange}>
      {options.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
