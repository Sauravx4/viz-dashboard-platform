export function generateChartSuggestions(data) {

  if (!data || data.length === 0) return [];

  const columns = Object.keys(data[0]);

  const numericColumns = [];
  const categoricalColumns = [];

  columns.forEach(col => {

    const value = data[0][col];

    if (!isNaN(parseFloat(value))) {
      numericColumns.push(col);
    } else {
      categoricalColumns.push(col);
    }

  });

  const suggestions = [];

  numericColumns.forEach(num => {

    categoricalColumns.forEach(cat => {

      suggestions.push({
        type: "bar",
        xAxis: cat,
        yAxis: num
      });

    });

  });

  if (numericColumns.length >= 2) {

    suggestions.push({
      type: "line",
      xAxis: numericColumns[0],
      yAxis: numericColumns[1]
    });

  }

  if (categoricalColumns.length && numericColumns.length) {

    suggestions.push({
      type: "pie",
      xAxis: categoricalColumns[0],
      yAxis: numericColumns[0]
    });

  }

  return suggestions;

}