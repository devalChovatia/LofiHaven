from fastapi import APIRouter, Depends, HTTPException, Path, Query
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from database import SessionLocal
from starlette import status
from models import Livestream
from database import get_db

router = APIRouter(tags=['livestream'])

db_dependency = Annotated[Session, Depends(get_db)]

class LivestreamRequest(BaseModel):
    channel_name: str = Field(min_length=3, max_length=20)
    livestream_name: str = Field(min_length=3, max_length=100)
    livestream_link: str
    genre_id: int = Field(gt=0)

@router.get('/livestreams')
async def getAllLivestreams(db: db_dependency):
    livestreams = db.query(Livestream).all()
    if not livestreams:
        raise HTTPException(status_code=404, detail='No Livestreams Found')
    return livestreams

@router.get('/livestreams/{genreID}', status_code=status.HTTP_200_OK)
async def getLivestreamsByGenre(db: db_dependency, genreID: int = Path(gt=0)):
    livestream_model = db.query(Livestream).filter(Livestream.genre_id == genreID).all()
    if livestream_model is None:
        raise HTTPException(status_code=404, detail='No Livestreams Found For This Genre')
    return livestream_model

@router.delete('/livestreams', status_code=status.HTTP_204_NO_CONTENT)
async def deleteLivestream(db: db_dependency, livestream_id: int = Query(gt=0)):
    livestream_model = db.query(Livestream).filter(Livestream.id == livestream_id).first()
    if livestream_model is None:
        raise HTTPException(status_code=404, detail='Livestream Not Found')
    db.query(Livestream).filter(Livestream.id == livestream_id).delete()
    db.commit()

