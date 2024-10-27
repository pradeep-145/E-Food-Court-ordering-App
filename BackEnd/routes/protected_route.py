from flask import Blueprint, request, jsonify
from models import daily_food
from utils import verify_token
protected_bp=Blueprint('protected',__name__)
data=None
# @protected_bp.before_request
# def check_toekn():
#     global data
#     token=None
#     if 'Authorization' in request.headers:
#         token=request.headers['Authorization'].split(" ")[1]

#     if not token:
#         return jsonify({'message':'Token is missing!'}),404
#     else:
#         data=verify_token(token)
#         if not data:
#             return jsonify({'message':'Invalid token!'}),400
#         else:
#             return "Token verified!",200

    


@protected_bp.route('/',methods=['GET'])
def get_all():
    foods=daily_food.query.all()
    output=[{'name':food.name,'price':food.price,'type':food.type,'image':food.image} for food in foods]
    return jsonify(output),200
