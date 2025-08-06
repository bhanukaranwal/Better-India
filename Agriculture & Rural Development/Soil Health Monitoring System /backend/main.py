from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
import sqlite3  # or use PostgreSQL via sqlalchemy

app = FastAPI()

class SoilData(BaseModel):
    moisture: float
    ph: float
    n: float
    p: float
    k: float
    temperature: float

def recommend(data: SoilData) -> str:
    # Basic logic (replace with advanced ML later)
    if data.n < 30: return "Apply Nitrogen-rich fertilizer"
    if data.ph < 6.5: return "Apply lime"
    return "Soil conditions optimal"

@app.post("/api/soil-data")
async def receive_soil_data(data: SoilData):
    # Store in DB...
    rec = recommend(data)
    return {"message": "Data received.", "recommendation": rec}

@app.get("/api/soil-history")
def soil_history():
    # Fetch historical data from DB
    return {"history": [...]}
