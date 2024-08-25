from fastapi import APIRouter, Depends, Query, HTTPException
from googleapiclient.discovery import build
from starlette import status
from typing import Annotated
from sqlalchemy.orm import Session
from database import SessionLocal
from pydantic import BaseModel, Field
from models import Livestream as DBLivestream
import os
from dotenv import load_dotenv
from database import get_db

load_dotenv()
API_KEY = os.getenv("YOUTUBE_API_KEY")

router = APIRouter(tags=['youtube'])

db_dependency = Annotated[Session, Depends(get_db)]

class Livestream(BaseModel):
    channel_name: str = Field(min_length=3, max_length=20)
    livestream_name: str = Field(min_length=3, max_length=100)
    livestream_link: str
    genre_id: int = Field(gt=0)

@router.get('/youtube', status_code=status.HTTP_200_OK)
async def getYoutubeVideo(db:db_dependency, url:str, genre_id: int = Query(gt=0)):
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    video_id = url.split('v=')[1]
    video_response = youtube.videos().list(
        part='snippet, statistics',
        id = video_id
    ).execute()

    livestream_name = video_response['items'][0]['snippet']['title']
    channel_name = video_response['items'][0]['snippet']['channelTitle']
    livestream_link = f"https://www.youtube.com/watch?v={video_id}"

    await storeLivestreamToDB(db, livestream_name, channel_name, livestream_link, genre_id)

    return {
        'livestream_name': livestream_name,
        'channel_name': channel_name,
        'livestream_link': livestream_link,
        'genre_id': genre_id
    }

async def storeLivestreamToDB(db: Session, livestream_name: str, channel_name: str, livestream_link: str, genre_id: int):
    try: 
        livestream_model = DBLivestream(
            livestream_name=livestream_name,
            channel_name=channel_name,
            livestream_link=livestream_link, 
            genre_id=genre_id)
        db.add(livestream_model)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=404, detail='Error In Updating Database')