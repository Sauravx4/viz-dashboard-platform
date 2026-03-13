import { Bar } from "react-chartjs-2";

function BarChartComponent({ data, xColumn, yColumn }) {

  const labels = data.map((row) => row[xColumn]);
  const values = data.map((row) => row[yColumn]);

  const chartData = {

    labels: labels,

    datasets: [
      {
        label: yColumn,
        data: values
      }
    ]

  };

  return <Bar data={chartData} />;

}

export default BarChartComponent;