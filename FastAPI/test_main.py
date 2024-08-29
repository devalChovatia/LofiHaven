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
    models.TestBase.metadata.create_all(bind=test_engine)
    yield
    models.TestBase.metadata.drop_all(bind=test_engine)


def test_getAllGenres_emptyDB(setup_database):
    setup_database
    res = client.get("/genres")
    assert res.status_code == 404
    assert res.json() == {"detail": "No Genres Available"}

def test_getAllLivestreams_emptyDB(setup_database):
    setup_database
    res = client.get('/livestreams')
    assert res.status_code == 404
    assert res.json() == {'detail': 'No Livestreams Found'}

def test_getAllSubmissions_emptyDB(setup_database):
    setup_database
    res = client.get('/submissions')
    assert res.status_code == 404
    assert res.json() == {'detail': 'Not Found'}

def test_postGenre(setup_database):
    setup_database
    res = client.post('/genres', json={'genre_name': 'Tokyo Tunes'})
    assert res.status_code == 201
    assert res.json() == {'genre_name': 'Tokyo Tunes', 'id': 1}

def test_getAllGenres(setup_database):
    setup_database
    client.post('/genre', json={'genre_name': 'Tokyo Tunes'})
    res = client.get('/genres')
    assert res.status_code == 200
    assert res.json() == [{'genre_name': 'Tokyo Tunes', 'id': 1}]

def test_postYoutubeVideo(setup_database):
    setup_database
    client.post('/genres', json={'genre_name': 'Tokyo Tunes'})
    res = client.get('/youtube', params={'url': 'https://www.youtube.com/watch?v=wkhLHTmS_GI', 'genre_id': 1})
    assert res.status_code == 200
    assert res.json() == {'livestream_name': '24/7 Lofi Hip Hop Radio ☁️ beats to relax/study/chill out (No lyrics)',
                           'channel_name': 'Dreamhop Music',
                           'livestream_link': 'https://www.youtube.com/watch?v=wkhLHTmS_GI',
                           'genre_id': 1 }

def test_getAllLinks(setup_database):
    setup_database
    client.post('/genres', json={'genre_name': 'Tokyo Tunes'})
    client.get('/youtube', params={'url': 'https://www.youtube.com/watch?v=wkhLHTmS_GI', 'genre_id': 1})
    res = client.get('/livestreams')
    assert res.status_code == 200
    assert res.json() == [{'genre_id': 1,
                           'livestream_link': 'https://www.youtube.com/watch?v=wkhLHTmS_GI',
                           'livestream_name': '24/7 Lofi Hip Hop Radio ☁️ beats to relax/study/chill out (No lyrics)',
                           'channel_name': 'Dreamhop Music',
                           'id': 1 }]

def test_getAllSubmissions(setup_database):
    setup_database
    client.post('/submission', json={'submission_type':'Livestream', 'submission_request':'A genre that emphasizes on coding'})
    res = client.get('/submission')
    assert res.status_code == 200
    assert res.json() == [{'submission_type':'Livestream', 'submission_request':'A genre that emphasizes on coding', 'id': 1}]

def test_deleteGenre(setup_database):
    setup_database
    client.post('/genres', json={'genre_name': 'Tokyo Tunes'})
    client.delete('/genres', params={'genre_id': 1})
    res = client.get('/genres')
    assert res.status_code == 404
    assert res.json() == {"detail": "No Genres Available"}

def test_deleteLivestream(setup_database):
    setup_database
    client.post('/genres', json={'genre_name': 'Tokyo Tunes'})
    client.get('/youtube', params={'url': 'https://www.youtube.com/watch?v=wkhLHTmS_GI', 'genre_id': 1})
    client.delete('/livestreams', params={'livestream_id': 1})
    res = client.get('/livestreams')
    assert res.status_code == 404
    assert res.json() == {"detail": "No Livestreams Available"}