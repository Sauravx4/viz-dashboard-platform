import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function UploadDataset() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
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

      // remove old dataset before new upload
      localStorage.removeItem("dataset");
      localStorage.removeItem("columns");

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Upload failed");
      }

      const result = await response.json();

      console.log("Upload Response:", result);

      // extract rows safely
      const rows = result.rows || result.data || [];

      if (!rows || rows.length === 0) {
        alert("Uploaded file contains no data.");
        return;
      }

      // extract columns
      const columns =
        result.columns ||
        Object.keys(rows[0]);

      // store dataset
      localStorage.setItem("dataset", JSON.stringify(rows));
      localStorage.setItem("columns", JSON.stringify(columns));

      console.log("Dataset stored:", rows.length, "rows");

      // go to preview page
      navigate("/preview");

    } catch (error) {

      console.error("Upload error:", error);
      alert("Upload failed. Check backend connection.");

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

      <button
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

    </div>

  );
}

export default UploadDataset;