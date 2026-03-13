import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UploadDataset from "./pages/UploadDataset";
import DataPreview from "./pages/DataPreview";
import Visualization from "./pages/Visualization";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={
          <>
            <UploadDataset />
            <DataPreview />
          </>
        } />

        <Route path="/" element={<UploadDataset />} />
        <Route path="/preview" element={<DataPreview />} />
        <Route path="/visualize" element={<Visualization />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </Router>
  );
}

export default App;