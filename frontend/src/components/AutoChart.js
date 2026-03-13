import React, { useState } from "react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function AutoChart({ data }) {

  const [chartType, setChartType] = useState("line");

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const keys = Object.keys(data[0]);

  const xKey = keys[0];
  const yKey = keys[1];

  return (
    <div>

      {/* Chart Selector */}
      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
      </select>

      {chartType === "line" && (
        <LineChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
        </LineChart>
      )}

      {chartType === "bar" && (
        <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yKey} fill="#82ca9d" />
        </BarChart>
      )}

      {chartType === "pie" && (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey={yKey}
            nameKey={xKey}
            outerRadius={100}
            fill="#8884d8"
          />
          <Tooltip />
        </PieChart>
      )}

    </div>
  );
}

export default AutoChart;