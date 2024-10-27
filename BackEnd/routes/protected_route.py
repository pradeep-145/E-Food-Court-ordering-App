from flask import Blueprint, request, jsonify
from models import *
from utils import *
protected_bp=Blueprint('protected',__name__)
data=None
# @protected_bp.before_request
# def check_token():
#     global data
#     token=None
#     if 'Authorization' in request.headers:
#         token=request.headers['Authorization'].split(" ")[1]

#     if not token:
#         return jsonify({'message':'Token is missing!'})
#     else:
#         data=verify_token(token)
#         if not data:
#             return jsonify({'message':'Invalid token!'})
#         else:
#             return "Token verified!"

    


@protected_bp.route('/',methods=['GET'])
def get_all():
    foods=daily_food.query.all()
    output=[{'name':food.name,'price':food.price,'type':food.type,'image':food.image} for food in foods]
    return jsonify(output)

@protected_bp.route('/cart', methods=['POST'])
def cart_update():
    data = request.get_json()
    user = data.get('user')
    items = data.get('items')
    
    if not user or not items:
        return jsonify({'message': 'Invalid data!'})

    new_cart = cart.query.filter_by(user=user).first()

    if new_cart:
        existing_items = new_cart.item  
        updated_items = existing_items + items
        new_cart.item = updated_items  
        message = 'Cart updated successfully!'
    else:
        new_cart = cart(user=user, item=items)  
        db.session.add(new_cart)
        message = 'All items added to cart successfully!'
    db.session.commit()
    return jsonify({'message': message})

@protected_bp.route('/cart',methods=['GET'])
def get_cart():
    data=request.get_json()
    try:
        output=cart.query.filter_by(username=data.get('username')).first()
        return jsonify(output)
    except Exception as e:
        return "No items in cart"