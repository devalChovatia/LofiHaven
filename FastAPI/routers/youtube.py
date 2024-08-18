from fastapi import APIRouter
from googleapiclient.discovery import build
from starlette import status

router = APIRouter()

API_KEY = 'AIzaSyDuaSh0aE3hfJoAUWlPhRnKCKziG8VWemE'

@router.get('/video', status_code=status.HTTP_200_OK)
async def getVideo(url:str):
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    video_id = url.split('v=')[1]
    video_response = youtube.videos().list(
        part='snippet, statistics',
        id = video_id
    ).execute()

    title = video_response['items'][0]['snippet']['title']
    channelName = video_response['items'][0]['snippet']['channelTitle']

    return {
        'title': title,
        'channleName': channelName
    }

    