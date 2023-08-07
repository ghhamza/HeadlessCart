from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict

router = APIRouter()


class ModelConfig(BaseModel):
    model: str
    view: str
    apiEndpoint: str
    routes: Dict[str, str]


@router.get("/config")
async def read_config():
    config = {
        'Product': {
            'model': 'Product',
            'view': 'list',
            'apiEndpoint': '/api/product',
            'routes': {
                'list': '/product',
                'detail': '/product/:id'
            },
        },
        # other models...
    }
    return config
