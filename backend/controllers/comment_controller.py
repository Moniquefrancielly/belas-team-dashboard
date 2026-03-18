from flask import jsonify
from services.api_service import fetch_data

def get_comments_by_post(post_id):
    try:
        comments = fetch_data(f"/comments?postId={post_id}")
        return jsonify(comments)
    except Exception as e:
        return jsonify({"error": str(e)}), 500