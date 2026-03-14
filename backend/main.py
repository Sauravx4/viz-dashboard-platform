from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global dataset storage
df = None

# Saved dashboards storage
saved_dashboards = {}


# Dashboard model
class Dashboard(BaseModel):
    layout: list
    data: list


# -------------------------
# Upload Dataset API
# -------------------------
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    global df

    try:

        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)

        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file.file)

        else:
            raise HTTPException(
                status_code=400,
                detail="Only CSV or XLSX files are allowed"
            )

        return {
            "message": "File uploaded successfully",
            "columns": list(df.columns)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -------------------------
# Preview Dataset
# -------------------------
@app.get("/preview")
def preview():

    global df

    if df is None:
        return {
            "columns": [],
            "rows": []
        }

    return {
        "columns": list(df.columns),
        "rows": df.head(10).to_dict(orient="records")
    }


# -------------------------
# Save Dashboard
# -------------------------
@app.post("/save-dashboard")
def save_dashboard(dashboard: Dashboard):

    dashboard_id = str(len(saved_dashboards) + 1)

    saved_dashboards[dashboard_id] = dashboard

    return {
        "message": "Dashboard saved",
        "dashboard_id": dashboard_id
    }


# -------------------------
# Load Dashboard
# -------------------------
@app.get("/dashboard/{dashboard_id}")
def get_dashboard(dashboard_id: str):

    dashboard = saved_dashboards.get(dashboard_id)

    if dashboard is None:
        raise HTTPException(
            status_code=404,
            detail="Dashboard not found"
        )

    return dashboard