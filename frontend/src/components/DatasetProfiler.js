import React, { useEffect, useState } from "react";

function DatasetProfiler({ dataset }) {

  const [profile, setProfile] = useState({
    rows: 0,
    columns: 0,
    numeric: 0,
    categorical: 0,
    missing: 0
  });

  useEffect(() => {

    if (!dataset || dataset.length === 0) return;

    const cols = Object.keys(dataset[0]);

    let numeric = 0;
    let categorical = 0;
    let missing = 0;

    cols.forEach(col => {

      let numericCount = 0;

      dataset.forEach(row => {

        if (row[col] === null || row[col] === "") {
          missing++;
        }

        if (!isNaN(parseFloat(row[col]))) {
          numericCount++;
        }

      });

      if (numericCount > dataset.length * 0.7) {
        numeric++;
      } else {
        categorical++;
      }

    });

    setProfile({
      rows: dataset.length,
      columns: cols.length,
      numeric,
      categorical,
      missing
    });

  }, [dataset]);

  return (

    <div style={{
      padding: "15px",
      borderBottom: "1px solid #ddd",
      background: "#fafafa"
    }}>

      <h3>Dataset Profile</h3>

      <div style={{ display: "flex", gap: "20px" }}>

        <div>Rows: <b>{profile.rows}</b></div>
        <div>Columns: <b>{profile.columns}</b></div>
        <div>Numeric: <b>{profile.numeric}</b></div>
        <div>Categorical: <b>{profile.categorical}</b></div>
        <div>Missing: <b>{profile.missing}</b></div>

      </div>

    </div>

  );
}

export default DatasetProfiler;