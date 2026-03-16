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

        rows = df.to_dict(orient="records")

        return {
            "message": "File uploaded successfully",
            "columns": list(df.columns),
            "rows": rows
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
        return {"columns": [], "rows": []}

    return {
        "columns": list(df.columns),
        "rows": df.head(10).to_dict(orient="records")
    }


# -------------------------
# Full Dataset API
# -------------------------
@app.get("/dataset")
def get_dataset():
    global df
    if df is None:
        return {"columns": [], "rows": []}

    return {
        "columns": list(df.columns),
        "rows": df.to_dict(orient="records")
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


# -------------------------
# AI Insights API
# -------------------------
@app.get("/insights")
def generate_insights():
    global df
    if df is None or df.empty:
        raise HTTPException(
            status_code=400,
            detail="Dataset not loaded"
        )

    insights = []

    # Dataset size
    insights.append({"title": "Total Rows", "value": len(df)})
    insights.append({"title": "Total Columns", "value": len(df.columns)})

    # Numeric column analysis
    numeric_cols = df.select_dtypes(include="number").columns
    if len(numeric_cols) > 0:
        col = numeric_cols[0]
        insights.append({"title": f"Average {col}", "value": round(df[col].mean(), 2)})
        insights.append({"title": f"Max {col}", "value": df[col].max()})
        insights.append({"title": f"Min {col}", "value": df[col].min()})

    # Missing values
    missing = int(df.isnull().sum().sum())
    insights.append({"title": "Missing Values", "value": missing})

    return {"insights": insights}


# -------------------------
# Natural Language Chart API
# -------------------------
@app.post("/nl-chart")
async def generate_chart_from_text(query: dict):
    global df
    if df is None:
        raise HTTPException(
            status_code=400,
            detail="Dataset not loaded"
        )

    text = query.get("query", "").lower()
    columns = list(df.columns)

    # Debug logs
    print("QUERY:", text)
    print("COLUMNS:", columns)

    x = None
    y = None

    # Flexible column matching
    for col in columns:
        col_clean = col.lower().replace("_", " ").replace("-", " ")
        if col_clean in text:
            if x is None:
                x = col
            else:
                y = col

    # Fallback if only one column detected
    if not y:
        numeric_cols = df.select_dtypes(include="number").columns
        if len(numeric_cols) > 0:
            y = numeric_cols[0]

    if not x:
        x = columns[0]

    return {
        "chart_type": "bar",
        "xAxis": x,
        "yAxis": y
    }