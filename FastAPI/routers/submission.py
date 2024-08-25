from fastapi import APIRouter, Depends, HTTPException, Path, Query
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from database import SessionLocal
from starlette import status
from models import Submission
from database import get_db

router = APIRouter(tags=['submission'])

db_dependency = Annotated[Session, Depends(get_db)]

class SubmissionRequest(BaseModel):
    submission_type: str
    submission_request: str = Field(max_length=75)

@router.get('/submission', status_code=status.HTTP_200_OK)
async def getAllSubmissions(db: db_dependency):
    submissions = db.query(Submission).all()
    if not submissions:
        raise HTTPException(status_code=404, detail='No Submissions Available')
    return submissions

@router.post('/submission', status_code=status.HTTP_201_CREATED)
async def addSubmission(db: db_dependency, submissionToAdd: SubmissionRequest):
    submission_model = Submission(**submissionToAdd.model_dump())
    db.add(submission_model)
    db.commit()
    db.refresh(submission_model)
    return submission_model

@router.delete('/submission', status_code=status.HTTP_204_NO_CONTENT)
async def deleteSubmission(db: db_dependency, submission_id: int = Query(gt=0)):
    submission_model = db.query(Submission).filter(Submission.id == submission_id).first()
    if submission_model is None:
        raise HTTPException(status_code=404, detail='Submission Not Found')
    db.query(Submission).filter(Submission.id == submission_id).delete()
    db.commit()
    