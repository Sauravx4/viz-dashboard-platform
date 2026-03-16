import { useDrop } from "react-dnd";

function ChartDropZone({ label, setField }) {

  const [, drop] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) => setField(item.name)
  }));

  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed gray",
        padding: "20px",
        margin: "10px"
      }}
    >
      Drop {label} here
    </div>
  );
}

export default ChartDropZone;