from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


df = None

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    global df

    if file.filename.endswith(".csv"):
        df = pd.read_csv(file.file)

    elif file.filename.endswith(".xlsx"):
        df = pd.read_excel(file.file)

    return {"message": "File uploaded successfully"}
@app.get("/preview")
def preview():

    global df

    if df is None:
        return {"columns": [], "rows": []}

    return {
        "columns": list(df.columns),
        "rows": df.head(10).to_dict(orient="records")
    }