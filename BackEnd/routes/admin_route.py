from flask import *
from models import *
from utils import *
import os;
from dotenv import load_dotenv
load_dotenv()


admin_bp=Blueprint('admin',__name__)
# @admin_bp.before_request
# def check_token():
#     token=None
#     if 'Authorization' in request.headers:
#         token=request.headers['Authorization'].split(" ")[1]

#     if not token:
#         return jsonify({'message':'Token is missing!'})
#     else:
#         data=verify_token(token)
#         if data=="Unauthorized" or not data:
#             return jsonify({'message':'Unauthorized'})

@admin_bp.route('/add', methods=['POST'])
def add_food():
    data = request.get_json()

    # Validate required fields
    required_fields = ['name', 'price', 'type', 'image']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({'error': f"Missing fields: {', '.join(missing_fields)}"}), 400

    try:
        # Create a new food entry
        new_food = daily_food(
            name=data['name'],
            price=float(data['price']),  # Ensure price is a float
            type=data['type'],
            image=data['image']
        )
        db.session.add(new_food)
        db.session.commit()

        return jsonify({'message': 'Item added successfully!'}), 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({'error': 'Failed to add item', 'details': str(e)}), 500


@admin_bp.route('/update',methods=['PUT'])
def update_food():
    data = request.get_json()
    food = daily_food.query.get(data['id'])
    if food:
        food.name = data.get('name', food.name)
        food.price = data.get('price', food.price)
        food.type = data.get('type', food.type)
        food.image = data.get('image', food.image)
        db.session.commit()
        return jsonify({'message': 'Item updated successfully!'})
    else:
        return jsonify({'message': 'Item not found!'}), 404