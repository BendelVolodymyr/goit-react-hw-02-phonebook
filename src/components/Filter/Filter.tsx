interface FilterProps {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Filter: React.FC<FilterProps> = ({ title, onChange, value }) => {
  return (
    <label>
      {title !== undefined && <h3>{title}</h3>}
      <input
        type="text"
        name="filter"
        value={value}
        placeholder="searc"
        onChange={onChange}
      />
    </label>
  );
};

export default Filter;
