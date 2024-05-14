


from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.models.entities import generate_response
from app.schemas.users import AuthUser
from app.schemas.warehouse import  WarehouseCreate, WarehouseUpdate



from ..database import  SessionLocal
from ..crud import statistical
from ..crud.warehouse import warehouse_import
from ..services.authenticate import get_current_user_id, has_permission, validate_token

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router_statistical = APIRouter()






@router_statistical.get("/statistical-revenue")
def get_statistical_revenue(user_id : int = Depends(get_current_user_id),  db : Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    # role_id, list_permission = current_user
    # if not has_permission(list_permission, "GET_REVENUE_STATISTICAL"):
    #         return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return statistical.calculate_revenue(user_id, db)


@router_statistical.get("/statistical-order")
def count_order_by_date_of_week(user_id : int = Depends(get_current_user_id),  db : Session = Depends(get_db), current_user: AuthUser = Depends(validate_token)):
    # role_id, list_permission = current_user
    # if not has_permission(list_permission, "GET_ORDER_STATISTICAL"):
    #         return generate_response("error", status.HTTP_401_UNAUTHORIZED, "You do not have access !")
    return statistical.order_by_date_week(user_id, db)

# @router_statistical.get("/warehouse")
# def search_warehouse(search: Optional[str] = Query(...), db: Session = Depends(get_db)):
#     return warehouse.get_warehouse_by_name(search,db)

# @router_statistical.get("/warehouse-statistical")
# def statistical_warehouse( db: Session = Depends(get_db)):
#     return warehouse.statistical_warehouse_crud(db)



# @router_statistical.put("/warehouses/{warehouse_id}")
# def update_warehouses(warehouse_id: int, update_warehouse: WarehouseUpdate,  db : Session = Depends(get_db)):
#     # return update_warehouse
#     return warehouse.update_warehouses_crud(update_warehouse, warehouse_id,db)

# @router_statistical.delete("/warehouses/{warehouse_id}")
# def delete_warehouse(warehouse_id: int, db: Session = Depends(get_db)):
#     return warehouse.delete_warehouses_crud(warehouse_id, db)

