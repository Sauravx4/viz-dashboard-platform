import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function InsightsPanel() {

  const [insights, setInsights] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/insights`)
      .then((res) => res.json())
      .then((data) => {
        setInsights(data.insights || []);
      })
      .catch(() => {
        console.log("Insights not available");
      });

  }, []);

  return (

    <div style={{
      display: "flex",
      gap: "15px",
      padding: "10px",
      flexWrap: "wrap"
    }}>

      {insights.map((insight, i) => (

        <div
          key={i}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "6px",
            minWidth: "150px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >

          <div style={{ fontSize: "14px", color: "#666" }}>
            {insight.title}
          </div>

          <div style={{ fontSize: "22px", fontWeight: "bold" }}>
            {insight.value}
          </div>

        </div>

      ))}

    </div>

  );

}

export default InsightsPanel;