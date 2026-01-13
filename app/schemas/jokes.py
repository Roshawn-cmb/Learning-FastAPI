from pydantic import BaseModel

class JokeBase(BaseModel):
    setup: str
    punchline:str

class JokeCreate(JokeBase):
    pass

class Joke(JokeBase):
    id: int

    class Config:
        orm_mode = True