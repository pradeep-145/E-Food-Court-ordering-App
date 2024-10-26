from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

app=Flask(__name__)

load_dotenv()

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('MQ_SQL_URI')


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db=SQLAlchemy(app)

class daily_food(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100))
    price=db.Column(db.Float)
    type=db.Column(db.String(100))
    image=db.Column(db.String(100))

class cart(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    user=db.Column(db.String(150))
    item=db.Column(db.JSON)


@app.route('/',methods=['GET'])
def get_all():
    foods=daily_food.query.all()
    output=[{'name':food.name,'price':food.price,'type':food.type,'image':food.image} for food in foods]
    return jsonify(output)

@app.route('/',methods=['POST'])
def post():
    data = request.get_json()
    for item in data:
        new_food = daily_food(
            name=item['name'],
            price=item['price'],
            type=item['type'],
            image=item['image']
        )
        db.session.add(new_food)
    db.session.commit()
    return jsonify({'message': 'All items added successfully!'})

@app.route('/',methods=['PUT'])
def update_food():
    data = request.get_json()
    for item in data:
        food = daily_food.query.get(item['id'])
        if food:
            food.name = item.get('name', food.name)
            food.price = item.get('price', food.price)
            food.type = item.get('type', food.type)
            food.image = item.get('image', food.image)
            db.session.commit()
    return jsonify({'message': 'Items updated successfully!'})

@app.route('/cart', methods=['POST'])
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

@app.route('/cart',methods=['GET'])
def get_cart():
    cart_items=cart.query.all()
    output=[{'user':item.user,'items':item.item} for item in cart_items]
    return jsonify(output)

if __name__=='__main__':
    app.run(port=5000,debug=True)