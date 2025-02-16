import time
from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask("apiDemo")
CORS(app)

@app.route("/time")
def say_hello():
    return {'time': time.time()}

@app.route("/add_data", methods=["POST"])
def add_data():
    data = request.json
    doc_ref = db.collection("demo").add({
        "name": data.get("name", "Sample Item"),
        "value": data.get("value", 42)
    })
    return jsonify({"message": "Data added successfully!"})

@app.route("/get_data")
def get_data():
    docs = db.collection("demo").stream()
    data = [{"id": doc.id, **doc.to_dict()} for doc in docs]
    return jsonify({"data": data})
