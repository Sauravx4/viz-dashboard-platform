import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis } from "recharts";

function ChartRenderer({ chart, data }) {

  if (chart.type === "bar") {

    return (
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey={chart.xAxis} />
        <YAxis />
        <Bar dataKey={chart.yAxis} />
      </BarChart>
    );
  }

  if (chart.type === "line") {

    return (
      <LineChart width={400} height={300} data={data}>
        <XAxis dataKey={chart.xAxis} />
        <YAxis />
        <Line dataKey={chart.yAxis} />
      </LineChart>
    );
  }

  if (chart.type === "pie") {

    return (
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey={chart.yAxis} nameKey={chart.xAxis} />
      </PieChart>
    );
  }

}

export default ChartRenderer;
