


from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.models.entities import generate_response
from app.schemas.supplier import SupplierCreate
from app.schemas.users import AuthUser



from ..database import  SessionLocal
from ..crud.supplier import create_supplier_crud, get_all_suppliers_crud, update_supplier_crud, delete_supplier_crud,get_supplier_by_name
from ..services.authenticate import get_current_user_id, has_permission, validate_token

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router_supplier = APIRouter()




@router_supplier.post("/supplier")
def create_supplier(supplier: SupplierCreate, db : Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "CREATE_SUPPLIER", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return create_supplier_crud(supplier, db)


@router_supplier.get("/supplier")
def get_all_warehouse(user_id : int = Depends(get_current_user_id),  db : Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "GET_ALL_SUPPLIER", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return get_all_suppliers_crud(user_id,db)

@router_supplier.get("/suppliers")
def search_supplier(search: Optional[str] = Query(...), db: Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "GET_SUPPLIER_BY_NAME", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return get_supplier_by_name(search,db)

@router_supplier.put("/supplier/{supplier_id}")
def update_supplier(supplier_id: int, update_supplier: SupplierCreate,  db : Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "UPDATE_SUPPLIER", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return update_supplier_crud(update_supplier, supplier_id,db)

@router_supplier.delete("/supplier/{supplier_id}")
def delete_supplier(supplier_id: int, db: Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    role_id, list_permission = current_user
    if not has_permission(list_permission, "DELETE_SUPPLIER", role_id):
            return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return delete_supplier_crud(supplier_id, db)