export default function Select({ id, value, name, options, onChange }) {
  return (
    <select id={id} value={value} name={name} onChange={onChange}>
      {options.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
