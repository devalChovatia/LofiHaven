from fastapi import APIRouter, Depends, HTTPException, Path, Query
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from database import SessionLocal
from starlette import status
from models import Genres, Livestream, Submission

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

class LivestreamRequest(BaseModel):
    channel_name: str = Field(min_length=3, max_length=20)
    livestream_name: str = Field(min_length=3, max_length=100)
    livestream_link: str

class SubmissionRequest(BaseModel):
    submission_type: str
    submission_request: str = Field(max_length=75)


@router.get('/genres', status_code=status.HTTP_200_OK)
async def getAllGenres(db: db_dependency):
    genres = db.query(Genres).all()
    if genres is not None:
        return genres
    raise HTTPException(status_code=404, detail="No Genres Available")

@router.get('/livestreams')
async def getAllLivestreams(db: db_dependency):
    livestreams = db.query(Livestream).all()
    if livestreams is not None:
        return livestreams
    raise HTTPException(status_code=404, detail='No Livestream Found')

@router.get('/submission', status_code=status.HTTP_200_OK)
async def getAllSubmissions(db: db_dependency):
    submissions = db.query(Submission).all()
    if submissions is not None:
        return submissions
    raise HTTPException(status_code=404, detail='No Submissions Available')

@router.post('/genres', status_code=status.HTTP_201_CREATED)
async def addGenre(db: db_dependency, genreToAdd: GenreRequest):
    genre_model = Genres(**genreToAdd.model_dump())
    db.add(genre_model)
    db.commit()

@router.post('/livestreams', status_code=status.HTTP_201_CREATED)
async def addLivestream(db: db_dependency, livestreamToAdd: LivestreamRequest):
    livestream_model = Livestream(**livestreamToAdd.model_dump())
    db.add(livestream_model)
    db.commit()

@router.post('/submission', status_code=status.HTTP_201_CREATED)
async def addSubmission(db: db_dependency, submissionToAdd: SubmissionRequest):
    submission_model = Submission(**submissionToAdd.model_dump())
    db.add(submission_model)
    db.commit()

@router.delete('/genres', status_code=status.HTTP_204_NO_CONTENT)
async def deleteGenre(db: db_dependency, genre_id: int = Query(gt=0)):
    genre_model = db.query(Genres).filter(Genres.id == genre_id).first()
    if genre_model is None:
        raise HTTPException(status_code=404, detail='Genre Not Found')
    db.query(Genres).filter(Genres.id == genre_id).delete()
    db.commit()

@router.delete('/livestreams', status_code=status.HTTP_204_NO_CONTENT)
async def deleteLivestream(db: db_dependency, livestream_id: int = Query(gt=0)):
    livestream_model = db.query(Livestream).filter(Livestream.id == livestream_id).first()
    if livestream_model is None:
        raise HTTPException(status_code=404, detail='Livestream Not Found')
    db.query(Livestream).filter(Livestream.id == livestream_id).delete()
    db.commit()

@router.delete('/submission', status_code=status.HTTP_204_NO_CONTENT)
async def deleteSubmission(db: db_dependency, submission_id: int = Query(gt=0)):
    submission_model = db.query(Submission).filter(Submission.id == submission_id).first()
    if submission_model is None:
        raise HTTPException(status_code=404, detail='Submission Not Found')
    db.query(Submission).filter(Submission.id == submission_id).delete()
    db.commit()