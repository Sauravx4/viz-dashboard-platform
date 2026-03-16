const API_URL = "https://ideal-space-disco-g47vx4prvrwv29rxx-8000.app.github.dev/";

export const uploadDataset = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData
  });

  return response.json();
};


export const getPreview = async () => {

  const response = await fetch(`${API_URL}/preview`);

  return response.json();
};


export const saveDashboard = async (dashboardData) => {

  const response = await fetch(`${API_URL}/save-dashboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dashboardData)
  });

  return response.json();
};