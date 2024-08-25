import pytest
from fastapi.testclient import TestClient
from test_database import TestSessionLocal, TestBase, test_engine
from database import get_db
import models
from main import app

def override_get_db():
    try:
        db = TestSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module")
def setup_database():
    TestBase.metadata.create_all(bind=test_engine)
    yield
    TestBase.metadata.drop_all(bind=test_engine)

def test_getAllGenres_emptyDB(setup_database):
    res = client.get("/genres")
    assert res.status_code == 404
    assert res.json() == {"detail": "No Genres Available"}

def test_getAllLivestreams_emptyDB(setup_database):
    res = client.get('/livestreams')
    assert res.status_code == 404
    assert res.json() == {'detail': 'No Livestreams Found'}

def test_getAllSubmissions(setup_database):
    res = client.get('/submissions')
    assert res.status_code == 404
    assert res.json() == {'detail': 'Not Found'}
    