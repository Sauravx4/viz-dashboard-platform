import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const API_URL = "https://your-codespace-8000.app.github.dev";

function DashboardToolbar({ autoGenerateCharts, charts }) {

  const saveDashboard = async () => {

    try {

      const res = await fetch(`${API_URL}/save-dashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          layout: charts.map(c => c.layout),
          data: charts
        })
      });

      const data = await res.json();

      const shareUrl = `${window.location.origin}/dashboard/${data.dashboard_id}`;

      alert("Dashboard Saved!\n\nShare Link:\n" + shareUrl);

    } catch (error) {

      alert("Failed to save dashboard");

    }

  };

  return (

    <AppBar position="static" color="primary">
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Smart BI Dashboard
        </Typography>

        <Button color="inherit" onClick={autoGenerateCharts}>
          Auto Charts
        </Button>

        <Button color="inherit" onClick={saveDashboard}>
          Save Dashboard
        </Button>

      </Toolbar>
    </AppBar>

  );

}

export default DashboardToolbar;