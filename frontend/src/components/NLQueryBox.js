import { useState } from "react";

const API_URL = "https://ideal-space-disco-g47vx4prvrwv29rxx-8000.app.github.dev/";

function NLQueryBox({ addChart }) {

  const [query, setQuery] = useState("");

  const runQuery = async () => {

    if (!query) return;

    const res = await fetch(`${API_URL}/nl-chart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();

    if (data.xAxis && data.yAxis) {

      addChart(
        data.chart_type,
        data.xAxis,
        data.yAxis
      );

      setQuery("");

    } else {
      alert("Could not understand query");
    }

  };

  return (

    <div
      style={{
        padding: "10px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: "10px"
      }}
    >

      <input
        style={{
          flex: 1,
          padding: "8px"
        }}
        placeholder="Ask: show sales by region"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={runQuery}>
        Generate
      </button>

    </div>

  );

}

export default NLQueryBox;