import { useEffect, useState } from "react";

const API_URL = "https://your-codespace-8000.app.github.dev";

function RecommendationsPanel({ addChart }) {

  const [charts, setCharts] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/chart-recommendations`)
      .then(res => res.json())
      .then(data => setCharts(data.charts || []))
      .catch(() => console.log("No recommendations"));

  }, []);

  return (

    <div style={{
      padding: "10px",
      borderBottom: "1px solid #ddd"
    }}>

      <h3>Recommended Charts</h3>

      <div style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap"
      }}>

        {charts.map((c, i) => (

          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              background: "#fff"
            }}
            onClick={() => addChart(c.type, c.xAxis, c.yAxis)}
          >

            <div style={{ fontWeight: "bold" }}>
              {c.title}
            </div>

            <div style={{ fontSize: "12px", color: "#666" }}>
              {c.type} chart
            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RecommendationsPanel;