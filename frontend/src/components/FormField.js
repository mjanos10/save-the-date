export default function FormField({ children, fieldId, label }) {
  return (
    <div className="form-field">
      <label htmlFor={fieldId}>{label}</label>
      {children}
    </div>
  );
}
