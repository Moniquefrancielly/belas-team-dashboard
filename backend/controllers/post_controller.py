from flask import jsonify
from services.api_service import fetch_data

def get_posts_by_user(user_id):
    try:
        posts = fetch_data(f"/posts?userId={user_id}")
        return jsonify(posts)
    except Exception as e:
        return jsonify({"error": str(e)}), 500