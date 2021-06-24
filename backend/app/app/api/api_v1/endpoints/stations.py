from typing import Any, List
import io
import zipfile

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import qrcode

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Station])
def read_stations(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve stations.
    """
    stations = crud.station.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )
    return stations


@router.post("/", response_model=schemas.Station)
def create_station(
    *,
    db: Session = Depends(deps.get_db),
    station_in: schemas.StationCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new station.
    """
    station = crud.station.create_with_owner(db=db, obj_in=station_in, owner_id=current_user.id)
    return station


@router.put("/{id}", response_model=schemas.Station)
def update_station(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    station_in: schemas.StationUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an station.
    """
    station = crud.station.get(db=db, id=id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    if not crud.user.is_superuser(current_user) and (station.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    station = crud.station.update(db=db, db_obj=station, obj_in=station_in)
    return station


@router.get("/{id}", response_model=schemas.Station)
def read_station(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get station by ID.
    """
    station = crud.station.get(db=db, id=id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    if not crud.user.is_superuser(current_user) and (station.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return station
    
@router.get("/qrcode/{id}")
def read_station_qrcode(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get station by ID.
    """
    station = crud.station.get(db=db, id=id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    if not crud.user.is_superuser(current_user) and (station.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    buffer = io.BytesIO()
    img = qrcode.make(f"https://bnbwise.xyz/main/stations/log/{id}")
    img.save(buffer, format="PNG")
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="image/png")

@router.get("/qrcodes/")
def read_stations_qrcodes(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve stations.
    """
    stations = crud.station.get_multi_by_owner(
        db=db, owner_id=current_user.id
    )
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "a", zipfile.ZIP_DEFLATED, False) as zip_file:
        for station in stations:
            buffer = io.BytesIO()
            img = qrcode.make(f"https://bnbwise.xyz/main/stations/log/{station.id}")
            img.save(buffer, format="PNG")
            zip_file.writestr(f"{station.title}-{station.id}.png", buffer.getvalue())
    zip_buffer.seek(0)
    return StreamingResponse(zip_buffer, media_type="application/zip")

@router.delete("/{id}", response_model=schemas.Station)
def delete_station(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete an station.
    """
    station = crud.station.get(db=db, id=id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    if not crud.user.is_superuser(current_user) and (station.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    station = crud.station.remove(db=db, id=id)
    return station
