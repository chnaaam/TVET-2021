import secrets

from flask import request, Blueprint
from flask_cors import cross_origin
from src.database.user import User
from src.utils.user_data_format import *

def construct_user_blueprint(database):
    user_blueprint = Blueprint('user', __name__, url_prefix="/user")

    @user_blueprint.route('/login', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def login():
        if request.method == 'POST':
            id = request.json['user_id']
            pw = request.json['user_pw']

            query = database.session.query(User).filter(User.user_id == id).filter(User.user_pw == pw)
            result = query.all()

            if result:
                return LOGIN_FORMAT(
                    status=True,
                    user_token=result[0].user_token,
                    is_manager=result[0].is_manager.decode())
            else:
                return LOGIN_FORMAT(status=False, user_token=None, is_manager=0)

    @user_blueprint.route('/logout', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def logout():
        return LOGOUT_FORMAT(status=True)

    @user_blueprint.route('/register', methods=['POST'])
    def register():
        if request.method == 'POST':
            id = request.json['user_id']
            pw = request.json['user_pw']
            email = request.json['user_email']
            token = secrets.token_hex(4)

            database.session.add(User(user_token=token, user_id=id, user_pw=pw, email=email, is_manager='0'.encode()))

            try:
                database.session.commit()
                return REGISTER_FORMAT(status=True)
            except Exception as e:
                return REGISTER_FORMAT(status=False)

    @user_blueprint.route('/salt', methods=["POST"])
    def get_salt():
        if request.method == "POST":
            return SALT_FORMAT(status=True, salt="12@!af13f#$")

    return user_blueprint