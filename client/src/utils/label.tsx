export default function label(label: string, required: Boolean = false) {
  return (
    <div className="input-label">
      <label>{label}</label>
      {required && <div className="required-field">*</div>}
    </div>
  );
}
