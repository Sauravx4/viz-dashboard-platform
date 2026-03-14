import { useState, useEffect, useRef } from "react";
import GridLayout from "react-grid-layout";
import AutoChart from "../components/AutoChart";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Dashboard() {

  const dashboardRef = useRef();

  const [layout, setLayout] = useState([
    { i: "chart1", x: 0, y: 0, w: 6, h: 6 },
    { i: "chart2", x: 6, y: 0, w: 6, h: 6 }
  ]);

  const [data, setData] = useState([]);

  // Fetch data from backend
  useEffect(() => {

    fetch("http://localhost:8000/preview")
      .then(res => res.json())
      .then(result => {
        setData(result.rows);
      });

  }, []);

  const exportImage = async () => {

    const canvas = await html2canvas(dashboardRef.current);

    const link = document.createElement("a");
    link.download = "dashboard.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const exportPDF = async () => {

    const canvas = await html2canvas(dashboardRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape");

    pdf.addImage(imgData, "PNG", 10, 10, 280, 150);

    pdf.save("dashboard.pdf");
  };
  const [charts, setCharts] = useState([]);
  const addChart = (type) => {

  const newChart = {
    id: "chart" + (charts.length + 1),
    type: type
  };

  setCharts([...charts, newChart]);

  setLayout([
    ...layout,
    { i: newChart.id, x: 0, y: Infinity, w: 6, h: 6 }
  ]);
};

  return (

    <div style={{ padding: "20px" }}>

      <h1>Dashboard Builder</h1>

      <button onClick={exportImage}>Download Image</button>

      <button onClick={exportPDF} style={{ marginLeft: "10px" }}>
        Download PDF
      </button>
      <button onClick={() => addChart("line")}>Add Line Chart</button>
<button onClick={() => addChart("bar")}>Add Bar Chart</button>
<button onClick={() => addChart("pie")}>Add Pie Chart</button>

      <div ref={dashboardRef}>

        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={60}
          width={1200}
          onLayoutChange={(newLayout) => setLayout(newLayout)}
        >

          {charts.map((chart) => (

  <div key={chart.id} style={{
    background:"#fff",
    padding:"10px",
    border:"1px solid #ddd"
  }}>

    <AutoChart
      data={data}
      type={chart.type}
    />

  </div>

))}

        </GridLayout>

      </div>

    </div>
  );
}

export default Dashboard;