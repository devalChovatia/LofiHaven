from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

TEST_DATABASE_URL = 'sqlite:///./test.db'

test_engine = create_engine(TEST_DATABASE_URL, connect_args={'check_same_thread': False})

TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

TestBase = declarative_base()


def override_get_db():
    try:
        db = TestSessionLocal()
        yield db
    finally:
        db.close()