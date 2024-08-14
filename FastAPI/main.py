from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

orig_host = "http://localhost:5173"  
app.add_middleware(
    CORSMiddleware,
    allow_origins=[orig_host],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def getFR():
    return {'message': 'Hello World'}