from datetime import datetime
from pathlib import Path
from typing import List
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.responses import HTMLResponse

app = FastAPI()

app.mount("/frontend", StaticFiles(directory=Path(__file__).parent / "frontend"), name="frontend")

class Capture(BaseModel):
    wpm: float = Field(gt=0)
    time: datetime = Field(default_factory=datetime.utcnow)

results: List[Capture] = []

@app.get("/", response_class=HTMLResponse)
def read_index():
    index_file = Path(__file__).parent / "frontend" / "index.html"
    return index_file.read_text()

@app.post('/typing')
def log_result(result: Capture):
    results.append(result)
    return {'message': 'Result is logged!', 'data': result}

@app.get('/typing')
def get_results():
    return results