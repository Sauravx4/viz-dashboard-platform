import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie,
  XAxis, YAxis, Tooltip
} from "recharts";

function AutoChart({ data, type }) {

  if (!data || data.length === 0) {
    return <p>No data</p>;
  }

  const xKey = Object.keys(data[0])[0];
  const yKey = Object.keys(data[0])[1];

  if (type === "line") {

    return (
      <LineChart width={400} height={250} data={data}>
        <XAxis dataKey={xKey}/>
        <YAxis/>
        <Tooltip/>
        <Line dataKey={yKey}/>
      </LineChart>
    );

  }

  if (type === "bar") {

    return (
      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey={xKey}/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey={yKey}/>
      </BarChart>
    );

  }

  if (type === "pie") {

    return (
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          dataKey={yKey}
          nameKey={xKey}
        />
        <Tooltip/>
      </PieChart>
    );

  }

}

export default AutoChart;