from flask import Blueprint
from controllers.user_controller import get_users
from controllers.post_controller import get_posts_by_user
from controllers.comment_controller import get_comments_by_post

main_routes = Blueprint('main', __name__)

main_routes.route('/users', methods=['GET'])(get_users)
main_routes.route('/posts/<int:user_id>', methods=['GET'])(get_posts_by_user)
main_routes.route('/comments/<int:post_id>', methods=['GET'])(get_comments_by_post)