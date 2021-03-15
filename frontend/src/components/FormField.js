import './FormField.css';

export default function FormField({ children, fieldId, label, error }) {
  return (
    <div className="form-field">
      <label htmlFor={fieldId} className="form-field__label">
        {label}
      </label>
      {children}
      {error && (
        <p className="form-field__error">
          {error.type === 'required'
            ? 'A mező kitöltése kötelező'
            : 'Kérjük helyes értéket adj meg'}
        </p>
      )}
    </div>
  );
}
