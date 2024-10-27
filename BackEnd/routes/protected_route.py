from flask import Blueprint, request, jsonify
from models import *
from utils import verify_token
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

@protected_bp.route('/cart',methods=['POST'])
def post_cart():
    data=request.get_json()
    try:
        output=cart.query.filter_by(username=data.get('username')).first()
        return jsonify(output)
    except Exception as e:
        return "No item Found",404

