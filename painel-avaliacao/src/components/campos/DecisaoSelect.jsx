const OPTIONS = [
  ["", "—"],
  ["A", "Aceitou"],
  ["I", "Ignorou"],
  ["D", "Denunciou"],
];

export default function DecisaoSelect({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {OPTIONS.map(([v, label]) => (
        <option key={v} value={v}>{label}</option>
      ))}
    </select>
  );
}
