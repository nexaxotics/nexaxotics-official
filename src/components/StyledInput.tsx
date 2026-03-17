"use client";

interface StyledInputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  required?: boolean;
}

export default function StyledInput({
  placeholder = "Enter text",
  label = "Enter text",
  type = "text",
  value,
  onChange,
  name,
  className = "",
  required = false,
}: StyledInputProps) {
  return (
    <div className={`styled-input-wrapper ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        className="styled-input-field"
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        id={name}
      />
      <label htmlFor={name} className="styled-input-label">
        {label}
        {required && <span style={{ color: '#ff6b6b', marginLeft: '4px' }}>*</span>}
      </label>
      <span className="styled-input-highlight" />
    </div>
  );
}
