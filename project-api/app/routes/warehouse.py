


from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.models.entities import generate_response
from app.schemas.users import AuthUser
from app.schemas.warehouse import  WarehouseCreate, WarehouseUpdate



from ..database import  SessionLocal
from ..crud import warehouse
from ..crud.warehouse import warehouse_import
from ..services.authenticate import get_current_user_id, has_permission, validate_token

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router_warehouse = APIRouter()




@router_warehouse.post("/warehouses")
def create_warehouses(warehouse: WarehouseCreate, db : Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "CREATE_WAREHOUSES", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return warehouse_import(warehouse, db)


@router_warehouse.get("/warehouses")
def get_all_warehouse(user_id : int = Depends(get_current_user_id),  db : Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "GET_ALL_WAREHOUSES", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return warehouse.get_all_warehouses(user_id,db)

@router_warehouse.get("/warehouse")
def search_warehouse(search: Optional[str] = Query(...), db: Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "GET_WAREHOUSES_BY_NAME", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return warehouse.get_warehouse_by_name(search,db)

@router_warehouse.get("/statistical-warehouse")
def statistical_warehouse( db: Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    # if not has_permission(list_permission, "GET_ALL_CART", role_id):
    #         return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return warehouse.statistical_warehouse_crud(db)



@router_warehouse.put("/warehouses/{warehouse_id}")
def update_warehouses(warehouse_id: int, update_warehouse: WarehouseUpdate,  db : Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "UPDATE_WAREHOUSES", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return warehouse.update_warehouses_crud(update_warehouse, warehouse_id,db)

@router_warehouse.delete("/warehouses/{warehouse_id}")
def delete_warehouse(warehouse_id: int, db: Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "DELETE_WAREHOUSES", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return warehouse.delete_warehouses_crud(warehouse_id, db)

