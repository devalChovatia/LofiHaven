from database import Base
from test_database import TestBase
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey



class Genres(Base):
    __tablename__ = 'Genres'

    id = Column(Integer, primary_key=True, index=True)
    genre_name = Column(String, unique=True)



class Livestream(Base):
    __tablename__ = 'Livestreams'

    id = Column(Integer, primary_key=True, index=True)
    genre_id = Column(Integer, ForeignKey("Genres.id"))
    livestream_name = Column(String, unique=True)
    channel_name = Column(String)
    livestream_link = Column(String, unique=True)

class Submission(Base, TestBase):
    __tablename__ = 'Requests'

    id = Column(Integer, primary_key=True, index=True)
    submission_type = Column(String)
    submission_request = Column(String)


# Models for pytest
class Genres(TestBase):
    __tablename__ = 'Genres'

    id = Column(Integer, primary_key=True, index=True)
    genre_name = Column(String, unique=True)

class Livestream(TestBase):
    __tablename__ = 'Livestreams'

    id = Column(Integer, primary_key=True, index=True)
    genre_id = Column(Integer, ForeignKey("Genres.id"))
    livestream_name = Column(String, unique=True)
    channel_name = Column(String)
    livestream_link = Column(String, unique=True)

class Submission(TestBase):
    __tablename__ = 'Requests'

    id = Column(Integer, primary_key=True, index=True)
    submission_type = Column(String)
    submission_request = Column(String)