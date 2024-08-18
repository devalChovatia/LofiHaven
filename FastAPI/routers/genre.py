from fastapi import APIRouter, Depends, HTTPException, Path, Query
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from database import SessionLocal
from starlette import status
from models import Genres

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

class GenreRequest(BaseModel):
    genre_name: str = Field(min_length=4)


@router.get('/genres', status_code=status.HTTP_200_OK)
async def getAllGenres(db: db_dependency):
    genres = db.query(Genres).all()
    if genres is not None:
        return genres
    raise HTTPException(status_code=404, detail="No Genres Available")

@router.post('/genres', status_code=status.HTTP_201_CREATED)
async def addGenre(db: db_dependency, genreToAdd: GenreRequest):
    genre_model = Genres(**genreToAdd.model_dump())
    db.add(genre_model)
    db.commit()

@router.delete('/genres', status_code=status.HTTP_204_NO_CONTENT)
async def deleteGenre(db: db_dependency, genre_id: int = Query(gt=0)):
    genre_model = db.query(Genres).filter(Genres.id == genre_id).first()
    if genre_model is None:
        raise HTTPException(status_code=404, detail='Genre Not Found')
    db.query(Genres).filter(Genres.id == genre_id).delete()
    db.commit()