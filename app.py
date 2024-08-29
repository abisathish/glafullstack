from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Setup MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['testdb']
collection = db['items']

@app.route('/items', methods=['GET'])
def get_items():
    items = list(collection.find())
    return dumps(items)

@app.route('/items', methods=['POST'])
def add_item():
    data = request.json
    result = collection.insert_one(data)
    return jsonify({'_id': str(result.inserted_id)}), 201

if __name__ == '__main__':
    app.run(debug=True)
