from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models 
from database import engine
from routers import genre

app = FastAPI()

orig_host = "http://localhost:5173"  
app.add_middleware(
    CORSMiddleware,
    allow_origins=[orig_host],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

app.include_router(genre.router)