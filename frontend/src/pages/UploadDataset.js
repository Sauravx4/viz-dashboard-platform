import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function UploadDataset() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a CSV or XLSX file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Upload failed: " + (data.detail || "Unknown error"));
        return;
      }

      alert("File uploaded successfully");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {

      console.error(error);
      alert("Network error connecting to server");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>Upload Dataset</h1>

      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

    </div>
  );
}

export default UploadDataset;