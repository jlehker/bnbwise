from typing import Optional

from pydantic import BaseModel


# Shared properties
class PropertyBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


# Properties to receive on item creation
class PropertyCreate(PropertyBase):
    title: str


# Properties to receive on item update
class PropertyUpdate(PropertyBase):
    pass


# Properties shared by models stored in DB
class PropertyInDBBase(PropertyBase):
    id: int
    title: str
    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Property(PropertyInDBBase):
    pass


# Properties properties stored in DB
class PropertyInDB(PropertyInDBBase):
    pass
