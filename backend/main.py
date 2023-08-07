from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from routes import config

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(config.router)
#app.include_router(auth.router, prefix="/auth")
