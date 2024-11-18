from flask import *
from models import *
from utils import *
protected_bp=Blueprint('protected',__name__)
data=None
@protected_bp.before_request
def check_token():
    global data
    token=None

    if 'Authorization' in request.headers:
        token=request.headers['Authorization'].split(" ")[1]

    if not token:
        return jsonify({'message':'Token is missing!'})
    else:
        data=verify_token(token)
        if data=="Unauthorized" or not data:
            return jsonify({'message':'Unauthorized'})

@protected_bp.route('/verify',methods=['GET'])
def home():
    return jsonify({"message":"Authorized","username":data})



@protected_bp.route('/',methods=['PUT'])
def update_food():
    data = request.get_json()
    food = daily_food.query.filter_by(name='Chicken Biryani').first()
    if food:
        food.quantity = data['quantity']
        db.session.commit()
    return jsonify({'message': 'Items updated successfully!'})

@protected_bp.route('/',methods=['GET'])
def get_all():
    foods=daily_food.query.all()
    output=[{'name':food.name,'price':food.price,'type':food.type,'image':food.image,'quantity':food.quantity} for food in foods]
    return jsonify(output)

@protected_bp.route('/cart', methods=['POST'])
def cart_update():
    data = request.get_json()
    user = data.get('user')
    items = data.get('item')
    current_app.logger.info(request.get_json())
    if not user or not items:
        return jsonify({'message': 'Invalid data!'})

    new_cart = cart.query.filter_by(user=user).first()

    if new_cart:
        existing_items = new_cart.item
        updated_items = existing_items+items
        new_cart.item = updated_items
        message = 'Cart updated successfully!'
    else:
        new_cart = cart(user=user, item=items)
        db.session.add(new_cart)
        message = 'All items added to cart successfully!'
    db.session.commit()
    return jsonify({'message': message})
@protected_bp.route('/cart/remove', methods=['POST'])
def cart_remove():
    data = request.get_json()
    user = data.get('user')
    items = data.get('item')
    if not user or not items:
        return jsonify({'message': 'Invalid data!'})

    new_cart = cart.query.filter_by(user=user).first()

    if new_cart:
        updated_items = items
        new_cart.item = updated_items
        message = 'Cart updated successfully!'
    else:
        message='user not found'
    db.session.commit()
    return jsonify({'message': message})

@protected_bp.route('/cart/<username>',methods=['GET'])
def get_cart(username):
    current_app.logger.info("hello %s",username)
    cart_items=cart.query.filter_by(user=username).all()
    output=[{'user':item.user,'items':item.item} for item in cart_items]
    return jsonify(output)


@protected_bp.route('/checkout',methods=['POST'])
def checkout():
    return jsonify({'success':True})


@protected_bp.route('/orderlist',methods=['POST'])
def orderlist():
    data=request.get_json()
    orders=data.get('orders')
    new_order=order_list(orders=orders)
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message':'Order placed successfully!','success':True})