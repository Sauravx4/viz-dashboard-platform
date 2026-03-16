import { useDrop } from "react-dnd";
import { useState } from "react";

function ChartBuilder({ addChart }) {

  const [xAxis, setXAxis] = useState(null);
  const [yAxis, setYAxis] = useState(null);

  const [{ isOverX }, dropX] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) => setXAxis(item.name),
    collect: (monitor) => ({
      isOverX: !!monitor.isOver()
    })
  }));

  const [{ isOverY }, dropY] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) => setYAxis(item.name),
    collect: (monitor) => ({
      isOverY: !!monitor.isOver()
    })
  }));

  const buildChart = () => {

    if (!xAxis || !yAxis) {
      alert("Select X and Y fields");
      return;
    }

    addChart("bar", xAxis, yAxis);

    setXAxis(null);
    setYAxis(null);

  };

  return (

    <div style={{
      width: "220px",
      borderLeft: "1px solid #ddd",
      padding: "10px"
    }}>

      <h3>Chart Builder</h3>

      <div
        ref={dropX}
        style={{
          border: "2px dashed #aaa",
          padding: "10px",
          marginBottom: "10px",
          background: isOverX ? "#eef" : "#fff"
        }}
      >
        X Axis: {xAxis || "Drop field here"}
      </div>

      <div
        ref={dropY}
        style={{
          border: "2px dashed #aaa",
          padding: "10px",
          marginBottom: "10px",
          background: isOverY ? "#eef" : "#fff"
        }}
      >
        Y Axis: {yAxis || "Drop field here"}
      </div>

      <button onClick={buildChart}>
        Create Chart
      </button>

    </div>

  );

}

export default ChartBuilder;