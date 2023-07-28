interface User {
  name: string;
  email: string;
}

interface Props {
  options: User[];
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

export default function UserSelect({ options, label, value, onChange }: Props) {
  return (
    <select
      name={label}
      value={value}
      onChange={(e) => onChange(e.target.name, e.target.value)}
    >
      {options.map((option) => (
        <option key={option.name} value={option.email}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
