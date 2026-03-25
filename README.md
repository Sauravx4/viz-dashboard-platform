## 🌐 Portfolio
👉 (https://sauravx4.github.io/SM-portfolio)
# 📊 AI Dashboard Builder  
### 🚀 Data Visualization Platform (React + FastAPI)

---

## 🧠 Project Overview

**AI Dashboard Builder** is a full-stack web application that allows users to:

- Upload datasets (CSV / Excel)
- Automatically preview data
- Generate interactive charts
- Build customizable dashboards
- Drag, resize, and rearrange charts
- Export dashboards as images or PDFs

This project mimics modern Business Intelligence tools like Power BI and Tableau in a simplified and developer-friendly way.

---

## 🎯 Key Features

### 📁 Dataset Upload
- Upload `.csv` and `.xlsx` files
- Backend processes data using Pandas

### 🔍 Data Preview
- View dataset columns and sample rows
- Quick understanding before visualization

### 📈 Dynamic Chart Generation
- Line Chart
- Bar Chart
- Pie Chart
- Automatically adapts based on dataset

### 🧩 Dashboard Builder
- Add multiple charts
- Drag & drop layout
- Resize charts
- Rearrange positions freely

### 📤 Export Options
- Download dashboard as:
  - 🖼 Image (PNG)
  - 📄 PDF

### 💾 Save Dashboard (Optional Feature)
- Store dashboard layouts
- Retrieve using dashboard ID

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router
- Recharts (for charts)
- React Grid Layout (drag & resize)

### Backend
- FastAPI
- Pandas
- Uvicorn

---

## 📂 Project Structure
viz-dashboard-platform/
│
├── backend/
│ ├── main.py
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── AutoChart.js
│ │ ├── pages/
│ │ │ ├── UploadDataset.js
│ │ │ ├── DataPreview.js
│ │ │ ├── Visualization.js
│ │ │ └── Dashboard.js
│ │ └── App.js
│
└── README.md


---

## ⚙️ Installation & Setup

### 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

Backend will run on:

http://localhost:8000
🔹 Frontend Setup
cd frontend
npm install
npm start

Frontend will run on:

http://localhost:3000
🔗 API Endpoints
Method	Endpoint	Description
POST	/upload	Upload dataset
GET	/preview	Get dataset preview
POST	/save-dashboard	Save layout
GET	/dashboard/{id}	Load saved dashboard
🔄 Application Flow
Upload Dataset
      ↓
Preview Data
      ↓
Generate Charts
      ↓
Build Dashboard
      ↓
Export / Save Dashboard
📸 Screenshots (Add your images here)
/screenshots/upload.png
/screenshots/dashboard.png
/screenshots/charts.png
🚀 Future Enhancements

🤖 AI-based chart recommendations

🎨 Theme customization

🔐 User authentication

☁️ Cloud storage integration

📊 Advanced analytics (filters, grouping)

💡 Use Cases

Business analytics dashboards

Student data projects

Data science visualization tools

Portfolio projects

👨‍💻 Author

Saurav
Data Analyst | Frontend & Backend Developer

⭐ Support

If you like this project:

⭐ Star the repository

🍴 Fork it

🛠 Contribute

📜 License

This project is open-source and available under the MIT License.

