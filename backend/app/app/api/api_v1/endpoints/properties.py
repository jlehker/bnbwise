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


@router.get("/", response_model=List[schemas.Property])
def read_properties(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve properties.
    """
    properties = crud.property.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )
    return properties


@router.post("/", response_model=schemas.Property)
def create_property(
    *,
    db: Session = Depends(deps.get_db),
    property_in: schemas.PropertyCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new property.
    """
    property = crud.property.create_with_owner(db=db, obj_in=property_in, owner_id=current_user.id)
    return property


@router.put("/{id}", response_model=schemas.Property)
def update_property(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    property_in: schemas.PropertyUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an property.
    """
    property = crud.property.get(db=db, id=id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    if not crud.user.is_superuser(current_user) and (property.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    property = crud.property.update(db=db, db_obj=property, obj_in=property_in)
    return property


@router.get("/{id}", response_model=schemas.Property)
def read_property(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get property by ID.
    """
    property = crud.property.get(db=db, id=id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    if not crud.user.is_superuser(current_user) and (property.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return property
    
@router.get("/qrcode/{id}")
def read_property_qrcode(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get property by ID.
    """
    property = crud.property.get(db=db, id=id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    if not crud.user.is_superuser(current_user) and (property.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    buffer = io.BytesIO()
    img = qrcode.make(f"https://bnbwise.xyz/main/properties/log/{id}")
    img.save(buffer, format="PNG")
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="image/png")

@router.get("/qrcodes/")
def read_properties_qrcodes(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve properties.
    """
    properties = crud.property.get_multi_by_owner(
        db=db, owner_id=current_user.id
    )
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "a", zipfile.ZIP_DEFLATED, False) as zip_file:
        for property in properties:
            buffer = io.BytesIO()
            img = qrcode.make(f"https://bnbwise.xyz/main/properties/log/{property.id}")
            img.save(buffer, format="PNG")
            zip_file.writestr(f"{property.title}-{property.id}.png", buffer.getvalue())
    zip_buffer.seek(0)
    return StreamingResponse(zip_buffer, media_type="application/zip")

@router.delete("/{id}", response_model=schemas.Property)
def delete_property(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete an property.
    """
    property = crud.property.get(db=db, id=id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    if not crud.user.is_superuser(current_user) and (property.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    property = crud.property.remove(db=db, id=id)
    return property
