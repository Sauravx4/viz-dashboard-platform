import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Pages
import UploadDataset from "./pages/UploadDataset";
import DataPreview from "./pages/DataPreview";
import Visualization from "./pages/Visualization";
import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <DndProvider backend={HTML5Backend}>

      <Router>

        <Routes>

          {/* Upload dataset page */}
          <Route path="/" element={<UploadDataset />} />

          {/* Data preview page */}
          <Route path="/preview" element={<DataPreview />} />

          {/* Visualization builder */}
          <Route path="/visualize" element={<Visualization />} />

          {/* ✅ Support both normal + saved dashboards */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />

        </Routes>

      </Router>

    </DndProvider>

  );

}

export default App;