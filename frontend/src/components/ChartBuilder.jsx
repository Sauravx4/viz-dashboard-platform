import { useDrop } from "react-dnd";
import { useState } from "react";

function ChartBuilder({ addChart }) {

  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  // X Axis Drop
  const [{ isOverX }, dropX] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) => {
      console.log("Dropped on X:", item); // DEBUG
      setXAxis(item.name);
    },
    collect: (monitor) => ({
      isOverX: !!monitor.isOver()
    })
  }));

  // Y Axis Drop
  const [{ isOverY }, dropY] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) => {
      console.log("Dropped on Y:", item); // DEBUG
      setYAxis(item.name);
    },
    collect: (monitor) => ({
      isOverY: !!monitor.isOver()
    })
  }));

  const buildChart = () => {

    if (!xAxis || !yAxis) {
      alert("Please select both X and Y axis");
      return;
    }

    addChart("bar", xAxis, yAxis);

    // Reset after creating chart
    setXAxis("");
    setYAxis("");

  };

  return (

    <div style={{
      width: "240px",
      borderLeft: "1px solid #ddd",
      padding: "10px",
      background: "#fafafa"
    }}>

      <h3>Chart Builder</h3>

      {/* X Axis */}
      <div
        ref={dropX}
        style={{
          border: "2px dashed #aaa",
          padding: "12px",
          marginBottom: "12px",
          background: isOverX ? "#e3f2fd" : "#fff"
        }}
      >
        <strong>X Axis:</strong><br />
        {xAxis || "Drop field here"}
      </div>

      {/* Y Axis */}
      <div
        ref={dropY}
        style={{
          border: "2px dashed #aaa",
          padding: "12px",
          marginBottom: "12px",
          background: isOverY ? "#e8f5e9" : "#fff"
        }}
      >
        <strong>Y Axis:</strong><br />
        {yAxis || "Drop field here"}
      </div>

      <button onClick={buildChart}>
        Create Chart
      </button>

    </div>

  );

}

export default ChartBuilder;