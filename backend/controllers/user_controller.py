from flask import jsonify
from services.api_service import fetch_data

def get_users():
    try:
        users = fetch_data("/users")
        return jsonify(users)
    except Exception as e:
        return jsonify({"error": str(e)}), 500