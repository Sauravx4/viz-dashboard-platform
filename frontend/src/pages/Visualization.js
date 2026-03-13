import { useEffect, useState } from "react";
import axios from "axios";
import BarChartComponent from "../components/BarChartComponent";
import AutoChart from "../components/AutoChart";

function Visualization() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const [xColumn, setXColumn] = useState("");
  const [yColumn, setYColumn] = useState("");

  useEffect(() => {

  axios.get(`${process.env.REACT_APP_API_URL}/preview`)
    .then((response) => {

      console.log(response.data);

      const cols = response.data.columns;
      const rows = response.data.rows;

      setColumns(cols);
      setData(rows);

      if (cols.length >= 2) {
        setXColumn(cols[0]);
        setYColumn(cols[1]);
      }

    })
    .catch((error) => {
      console.error(error);
    });

}, []);

  return (

    <div style={{ padding: "40px" }}>

      <h2>Dataset Visualization</h2>
      <AutoChart data={data} />

      {columns.length > 0 && (

        <div style={{ marginBottom: "20px" }}>

          <label>X Axis: </label>

          <select
            value={xColumn}
            onChange={(e) => setXColumn(e.target.value)}
          >

            {columns.map((col, i) => (
              <option key={i} value={col}>
                {col}
              </option>
            ))}

          </select>

          <label style={{ marginLeft: "20px" }}>Y Axis: </label>

          <select
            value={yColumn}
            onChange={(e) => setYColumn(e.target.value)}
          >

            {columns.map((col, i) => (
              <option key={i} value={col}>
                {col}
              </option>
            ))}

          </select>

        </div>

      )}

      {xColumn && yColumn && (
        <BarChartComponent
          data={data}
          xColumn={xColumn}
          yColumn={yColumn}
        />
      )}

    </div>

  );

}

export default Visualization;