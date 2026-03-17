import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import DashboardGrid from "../components/DashboardGrid";
import FieldsPanel from "../components/FieldsPanel";
import ChartBuilder from "../components/ChartBuilder";
import FiltersPanel from "../components/FiltersPanel";
import DashboardToolbar from "../components/DashboardToolbar";
import DatasetProfiler from "../components/DatasetProfiler";
import NLQueryBox from "../components/NLQueryBox";
import InsightsPanel from "../components/InsightsPanel";
import RecommendationsPanel from "../components/RecommendationsPanel";

import { generateChartSuggestions } from "../utils/chartSuggestions";

function Dashboard() {

  const location = useLocation();
  const { id } = useParams(); // ✅ get dashboard id

  // Safe localStorage dataset load
  const storedDataset = localStorage.getItem("dataset");

  const initialData =
    location.state?.dataset ||
    (storedDataset ? JSON.parse(storedDataset) : []);

  const [dataset] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [charts, setCharts] = useState([]);

  // -----------------------
  // ✅ Load dashboard from backend (UPDATED FIX)
  // -----------------------
  useEffect(() => {

    if (id) {

      fetch(`https://your-codespace-8000.app.github.dev/dashboard/${id}`)
        .then(res => res.json())
        .then(data => {

          if (data && data.data) {

            const loadedCharts = data.data.map((chart, index) => ({
              ...chart,
              layout: data.layout[index] || chart.layout
            }));

            setCharts(loadedCharts);

          }

        })
        .catch(() => {
          console.log("Failed to load dashboard");
        });

    }

  }, [id]);


  // Save dataset for persistence
  useEffect(() => {
    if (dataset && dataset.length > 0) {
      localStorage.setItem("dataset", JSON.stringify(dataset));
    }
  }, [dataset]);


  // -----------------------
  // Add Chart
  // -----------------------
  const addChart = (type, x, y) => {

    const newChart = {
      id: Date.now(),
      type,
      xAxis: x,
      yAxis: y,
      layout: {
        x: (charts.length * 4) % 12,
        y: Infinity,
        w: 4,
        h: 4
      }
    };

    setCharts([...charts, newChart]);
  };


  // -----------------------
  // Update Grid Layout
  // -----------------------
  const updateLayout = (layout) => {

    const updatedCharts = charts.map((chart, i) => ({
      ...chart,
      layout: layout[i]
    }));

    setCharts(updatedCharts);
  };


  // -----------------------
  // Auto Chart Suggestions
  // -----------------------
  const autoGenerateCharts = () => {

    const suggestions = generateChartSuggestions(filteredData);

    const newCharts = suggestions.map((s, index) => ({
      id: Date.now() + index,
      type: s.type,
      xAxis: s.xAxis,
      yAxis: s.yAxis,
      layout: {
        x: (index * 4) % 12,
        y: Math.floor(index / 3) * 4,
        w: 4,
        h: 4
      }
    }));

    setCharts(newCharts);

  };


  // -----------------------
  // No Dataset Guard
  // -----------------------
  if (!dataset || dataset.length === 0) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>No dataset loaded</h2>
        <p>Please upload a dataset first.</p>
      </div>
    );
  }


  // -----------------------
  // Dashboard UI
  // -----------------------
  return (

    <div>

      {/* Toolbar */}
      <DashboardToolbar
        autoGenerateCharts={autoGenerateCharts}
        charts={charts}
      />

      {/* Natural Language Query */}
      <NLQueryBox addChart={addChart} />

      {/* AI Insights */}
      <InsightsPanel />

      {/* GPT Chart Recommendations */}
      <RecommendationsPanel addChart={addChart} />

      {/* Dataset Profile */}
      <DatasetProfiler dataset={dataset} />

      <div style={{ display: "flex", height: "85vh" }}>

        {/* Fields Panel */}
        <FieldsPanel dataset={dataset} />

        {/* Filters Panel */}
        <FiltersPanel
          dataset={dataset}
          setFilteredData={setFilteredData}
        />

        {/* Dashboard Canvas */}
        <div style={{ flex: 1, padding: "10px" }}>
          <DashboardGrid
            charts={charts}
            dataset={filteredData}
            updateLayout={updateLayout}
          />
        </div>

        {/* Chart Builder */}
        <ChartBuilder addChart={addChart} />

      </div>

    </div>

  );
}

export default Dashboard;