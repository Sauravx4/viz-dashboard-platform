import { useState } from "react";

function FiltersPanel({ dataset, setFilteredData }) {

  const [column, setColumn] = useState("");
  const [value, setValue] = useState("");

  const columns = Object.keys(dataset[0] || {});

  const applyFilter = () => {

    const filtered = dataset.filter(
      (row) => String(row[column]) === value
    );

    setFilteredData(filtered);
  };

  return (

    <div style={{ width: "200px", padding: "10px", borderRight: "1px solid #ddd" }}>

      <h3>Filters</h3>

      <select onChange={(e) => setColumn(e.target.value)}>
        <option>Select Column</option>
        {columns.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input
        placeholder="Value"
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={applyFilter}>Apply</button>

    </div>

  );
}

export default FiltersPanel;