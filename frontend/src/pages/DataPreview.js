import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPreview } from "../services/api";

function DataPreview() {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

  const storedRows = JSON.parse(localStorage.getItem("dataset")) || [];
  const storedCols = JSON.parse(localStorage.getItem("columns")) || [];

  setData(storedRows);
  setColumns(storedCols);

}, []);

  return (

    <div style={{ padding: "40px" }}>

      <h1>Dataset Preview</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/visualize", { state: { dataset: data } })}
      >
        Open Visualization
      </button>

      <button
        style={{ marginLeft: "20px" }}
        onClick={() => navigate("/dashboard", { state: { dataset: data } })}
      >
        Open Dashboard
      </button>

    </div>

  );
}

export default DataPreview;