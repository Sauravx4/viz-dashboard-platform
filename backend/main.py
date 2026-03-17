from database import (
    datasets_collection,
    dashboards_collection,
    users_collection
)

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from bson import ObjectId

app = FastAPI()

# -------------------------
# CORS (UPDATED)
# -------------------------
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://*.github.dev",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# MODELS
# -------------------------
class Dashboard(BaseModel):
    layout: list
    data: list
    dataset_id: str
    user_id: str | None = None


# -------------------------
# UPLOAD DATASET (MongoDB)
# -------------------------
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file.file)
        else:
            raise HTTPException(status_code=400, detail="Only CSV or XLSX files allowed")

        if df.empty:
            raise HTTPException(status_code=400, detail="Uploaded file contains no data")

        data = df.to_dict(orient="records")

        result = datasets_collection.insert_one({
            "data": data,
            "columns": list(df.columns)
        })

        return {
            "dataset_id": str(result.inserted_id),
            "columns": list(df.columns),
            "rows": data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------
# PREVIEW DATASET
# -------------------------
@app.get("/preview/{dataset_id}")
def preview(dataset_id: str):
    dataset = datasets_collection.find_one({"_id": ObjectId(dataset_id)})
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    return {
        "columns": dataset["columns"],
        "rows": dataset["data"][:10]
    }


# -------------------------
# FULL DATASET
# -------------------------
@app.get("/dataset/{dataset_id}")
def get_dataset(dataset_id: str):
    dataset = datasets_collection.find_one({"_id": ObjectId(dataset_id)})
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    return {
        "columns": dataset["columns"],
        "rows": dataset["data"]
    }


# -------------------------
# SAVE DASHBOARD
# -------------------------
@app.post("/save-dashboard")
def save_dashboard(dashboard: Dashboard):
    if not dashboard.data or not dashboard.layout:
        raise HTTPException(status_code=400, detail="Dashboard data or layout missing")

    result = dashboards_collection.insert_one({
        "layout": dashboard.layout,
        "data": dashboard.data,
        "dataset_id": dashboard.dataset_id,
        "user_id": dashboard.user_id
    })

    return {
        "message": "Dashboard saved successfully",
        "dashboard_id": str(result.inserted_id)
    }


# -------------------------
# LOAD DASHBOARD
# -------------------------
@app.get("/dashboard/{dashboard_id}")
def get_dashboard(dashboard_id: str):
    dashboard = dashboards_collection.find_one({"_id": ObjectId(dashboard_id)})
    if not dashboard:
        raise HTTPException(status_code=404, detail="Dashboard not found")

    dataset = datasets_collection.find_one({"_id": ObjectId(dashboard["dataset_id"])})

    if not dataset:
        raise HTTPException(status_code=404, detail="Associated dataset not found")

    return {
        "layout": dashboard["layout"],
        "data": dashboard["data"],
        "dataset": dataset["data"]
    }


# -------------------------
# AI INSIGHTS
# -------------------------
@app.get("/insights/{dataset_id}")
def generate_insights(dataset_id: str):
    dataset = datasets_collection.find_one({"_id": ObjectId(dataset_id)})

    if not dataset or not dataset["data"]:
        raise HTTPException(status_code=400, detail="Dataset not loaded")

    df = pd.DataFrame(dataset["data"])
    insights = []

    insights.append({"title": "Total Rows", "value": len(df)})
    insights.append({"title": "Total Columns", "value": len(df.columns)})

    numeric_cols = df.select_dtypes(include="number").columns

    if len(numeric_cols) > 0:
        col = numeric_cols[0]
        insights.append({"title": f"Average {col}", "value": round(df[col].mean(), 2)})
        insights.append({"title": f"Max {col}", "value": df[col].max()})
        insights.append({"title": f"Min {col}", "value": df[col].min()})

    missing = int(df.isnull().sum().sum())
    insights.append({"title": "Missing Values", "value": missing})

    return {"insights": insights}


# -------------------------
# NATURAL LANGUAGE CHART
# -------------------------
@app.post("/nl-chart/{dataset_id}")
async def generate_chart_from_text(dataset_id: str, query: dict):
    dataset = datasets_collection.find_one({"_id": ObjectId(dataset_id)})

    if not dataset:
        raise HTTPException(status_code=400, detail="Dataset not loaded")

    df = pd.DataFrame(dataset["data"])
    text = query.get("query", "").lower()
    columns = list(df.columns)

    x = None
    y = None

    for col in columns:
        clean_col = col.lower().replace("_", " ").replace("-", " ")
        if clean_col in text:
            if x is None:
                x = col
            else:
                y = col

    if not y:
        numeric_cols = df.select_dtypes(include="number").columns
        if len(numeric_cols) > 0:
            y = numeric_cols[0]

    if not x:
        x = columns[0]

    return {"chart_type": "bar", "xAxis": x, "yAxis": y}


# -------------------------
# CHART RECOMMENDATIONS
# -------------------------
@app.get("/chart-recommendations/{dataset_id}")
def chart_recommendations(dataset_id: str):
    dataset = datasets_collection.find_one({"_id": ObjectId(dataset_id)})

    if not dataset or not dataset["data"]:
        raise HTTPException(status_code=400, detail="Dataset not loaded")

    df = pd.DataFrame(dataset["data"])
    recommendations = []

    numeric_cols = df.select_dtypes(include="number").columns.tolist()
    categorical_cols = df.select_dtypes(exclude="number").columns.tolist()

    if categorical_cols and numeric_cols:
        recommendations.append({
            "type": "bar",
            "xAxis": categorical_cols[0],
            "yAxis": numeric_cols[0],
            "title": f"{numeric_cols[0]} by {categorical_cols[0]}"
        })

    for col in df.columns:
        if "date" in col.lower() or "month" in col.lower():
            if numeric_cols:
                recommendations.append({
                    "type": "line",
                    "xAxis": col,
                    "yAxis": numeric_cols[0],
                    "title": f"{numeric_cols[0]} over {col}"
                })

    if categorical_cols:
        recommendations.append({
            "type": "pie",
            "xAxis": categorical_cols[0],
            "title": f"Distribution of {categorical_cols[0]}"
        })

    return {"charts": recommendations}