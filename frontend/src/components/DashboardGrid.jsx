import GridLayout from "react-grid-layout";
import ChartRenderer from "./ChartRenderer";

function DashboardGrid({ charts, dataset, updateLayout }) {

  return (

    <GridLayout
      className="layout"
      cols={12}
      rowHeight={40}
      width={1200}
      onLayoutChange={updateLayout}
    >

      {charts.map(chart => (

        <div key={chart.id} data-grid={chart.layout}>

          <ChartRenderer chart={chart} data={dataset} />

        </div>

      ))}

    </GridLayout>

  );
}

export default DashboardGrid;