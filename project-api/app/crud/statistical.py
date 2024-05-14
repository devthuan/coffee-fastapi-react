from fastapi import HTTPException
from fastapi.exceptions import RequestValidationError
from app.models.entities import generate_response
from app.schemas.order import OrderCreate
from sqlalchemy.orm import Session, load_only, Load
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text


from app.schemas.warehouse import WarehouseUpdate, WarehouseCreate
from ..models import tables


def calculate_revenue(user_id: int, db: Session):
    try:
        sql_query = text("""
            SELECT 
            DATE(orders.created_date) AS order_date,
            SUM(products.price * orderdetail.quantity) AS sum_order 
            FROM 
                orders
            JOIN 
                orderdetail ON orders.id = orderdetail.order_id
            JOIN 
                products ON orderdetail.product_id = products.id
            WHERE 
                order_status LIKE 'Successful'
            GROUP BY 
                order_date
            ORDER BY 
                order_date DESC
            LIMIT 30
        """)
        result_query = db.execute(sql_query).fetchall()
        
        if result_query:
            formated_result = []
            for row in result_query:
                formated_result.append({
                    'date_revenue': row[0],
                    'total_revenue': row[1]
                })
            return generate_response("success", 200, "Revenue statistics retrieved successfully", formated_result)
        
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Lỗi máy chủ nội bộ: " + str(e))
    
def order_by_date_week(user_id: int, db: Session):
    try:
        sql_query = text("""
            SELECT 
                DAYOFWEEK(orders.created_date) AS day_of_week,
                COUNT(*) AS order_count
            FROM 
                orders
            GROUP BY 
                DAYOFWEEK(orders.created_date)
            ORDER BY 
                DAYOFWEEK(orders.created_date)
        """)
        result_query = db.execute(sql_query).fetchall()
        
        if result_query:
            formated_result = []
            for row in result_query:
                formated_result.append({
                    'date_of_week': 'Thứ ' + str(row[0]),
                    'total_order': row[1]
                })
            return generate_response("success", 200, "order statistics retrieved successfully", formated_result)
        
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Lỗi máy chủ nội bộ: " + str(e))
