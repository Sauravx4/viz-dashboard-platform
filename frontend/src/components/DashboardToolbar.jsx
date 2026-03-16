import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function DashboardToolbar({ autoGenerateCharts }) {

  return (
    <AppBar position="static" color="primary">
      <Toolbar>

        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Smart BI Dashboard
        </Typography>

        <Button color="inherit" onClick={autoGenerateCharts}>
          Auto Charts
        </Button>

        <Button color="inherit">
          Save Dashboard
        </Button>

      </Toolbar>
    </AppBar>
  );
}

export default DashboardToolbar;