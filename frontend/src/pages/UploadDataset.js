import React, { useState } from "react";

function UploadDataset() {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {

  if (!file) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  await fetch("https://ideal-space-disco-g47vx4prvrwv29rxx-8000.app.github.dev/upload", {
  method: "POST",
  body: formData
});

  alert("File uploaded successfully");

};

  return (
    <div style={{ padding: "40px" }}>

      <h1>Upload Dataset</h1>

      <input
        type="file"
        onChange={handleFileChange}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload
      </button>

    </div>
  );
}

export default UploadDataset;