from typing import Optional

from pydantic import BaseModel


# Shared properties
class StationBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    property_id: Optional[int] = None


# Properties to receive on item creation
class StationCreate(StationBase):
    title: str


# Properties to receive on item update
class StationUpdate(StationBase):
    pass


# Properties shared by models stored in DB
class StationInDBBase(StationBase):
    id: int
    title: str
    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Station(StationInDBBase):
    pass


# Properties properties stored in DB
class StationInDB(StationInDBBase):
    pass
