from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from database.models import Site, SiteDomains
from database import database
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel

engine = database.engine


# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter()


class CreateSiteRequest(BaseModel):
    name: str
    description: str
    domain_names: List[str]


def check_duplicate_field(db: Session, model_cls, fields_values: dict):
    existing_item = db.query(model_cls).filter_by(**fields_values).first()
    if existing_item:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"A {model_cls.__name__} with the same fields already exists",
        )


@router.post("/site")
async def create_site(request: CreateSiteRequest, db: Session = Depends(get_db)):
    check_duplicate_field(db, Site, {'name': request.name})

    new_site = Site(name=request.name, description=request.description)
    db.add(new_site)

    # Add each domain name as a new SiteDomain associated with this site
    for domain_name in request.domain_names:
        new_domain = SiteDomains(domain_name=domain_name, site=new_site)
        db.add(new_domain)

    db.commit()

    return {"message": f"Site {request.name} created successfully with domains: {request.domain_names}"}


@router.get("/sites")
async def get_sites(db: Session = Depends(get_db)):
    sites = db.query(Site).options(joinedload(Site.domains)).all()
    return sites


@router.get("/site/{site_id}")
async def get_sites(site_id: int, db: Session = Depends(get_db)):
    sites = db.query(Site).options(joinedload(Site.domains)).get(site_id)
    return sites
