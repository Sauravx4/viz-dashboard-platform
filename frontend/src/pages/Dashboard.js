import { useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import AutoChart from "../components/AutoChart";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Dashboard({ data }) {

  const dashboardRef = useRef();

  const [layout, setLayout] = useState([
    { i: "chart1", x: 0, y: 0, w: 6, h: 6 },
    { i: "chart2", x: 6, y: 0, w: 6, h: 6 }
  ]);

  // Export Dashboard as Image
  const exportImage = async () => {
    const canvas = await html2canvas(dashboardRef.current);
    const link = document.createElement("a");

    link.download = "dashboard.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // Export Dashboard as PDF
  const exportPDF = async () => {
    const canvas = await html2canvas(dashboardRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape");

    pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
    pdf.save("dashboard.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Dashboard Builder</h1>

      {/* Export Buttons */}
      <button onClick={exportImage}>
        Download Image
      </button>

      <button onClick={exportPDF} style={{ marginLeft: "10px" }}>
        Download PDF
      </button>

      {/* Dashboard Area */}
      <div ref={dashboardRef}>

        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={60}
          width={1200}
          onLayoutChange={(newLayout) => setLayout(newLayout)}
        >

          <div
            key="chart1"
            style={{
              background: "#fff",
              padding: "10px",
              border: "1px solid #ddd"
            }}
          >
            <AutoChart data={data} />
          </div>

          <div
            key="chart2"
            style={{
              background: "#fff",
              padding: "10px",
              border: "1px solid #ddd"
            }}
          >
            <AutoChart data={data} />
          </div>

        </GridLayout>

      </div>

    </div>
  );
}

export default Dashboard;