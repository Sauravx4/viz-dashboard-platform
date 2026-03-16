import { useDrag } from "react-dnd";

function Field({ name }) {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (

    <div
      ref={drag}
      style={{
        padding: "8px",
        border: "1px solid #ddd",
        marginBottom: "5px",
        cursor: "move",
        background: isDragging ? "#eee" : "#fff"
      }}
    >
      {name}
    </div>

  );

}

function FieldsPanel({ dataset }) {

  if (!dataset || dataset.length === 0) return null;

  const columns = Object.keys(dataset[0]);

  return (

    <div style={{
      width: "200px",
      borderRight: "1px solid #ddd",
      padding: "10px"
    }}>

      <h3>Fields</h3>

      {columns.map((col) => (
        <Field key={col} name={col} />
      ))}

    </div>

  );

}

export default FieldsPanel;