import React, { useEffect, useState } from "react";
import axios from "axios";

function DataPreview() {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {

    axios.get("https://ideal-space-disco-g47vx4prvrwv29rxx-8000.app.github.dev/preview")
      .then((response) => {

        setColumns(response.data.columns);
        setData(response.data.rows);

      })
      .catch((error) => {
        console.error(error);
      });

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

    </div>

  );
}

export default DataPreview;