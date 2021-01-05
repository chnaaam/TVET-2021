import os
from flask import request, g, Blueprint, send_file
from datetime import datetime
from flask_cors import cross_origin
from src.database.free_board import FreeBoard
from src.utils.free_board_format import *

def construct_free_board_blueprint(database, stored_file_path):
    free_board_blueprint = Blueprint('free_board', __name__, url_prefix="/free_board")

    @free_board_blueprint.route('/register', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def register():
        if request.method == 'POST':
            id = request.json['user_id']
            token = request.json['user_token']
            title = request.json['title']
            content = request.json['content']
            file_list = request.json['file_name_list']
            registered_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            query = database.session.query(FreeBoard).order_by(FreeBoard.no.desc()).all()
            query = query[0]

            database.session.add(FreeBoard(
                no=query.no + 1,
                title=title,
                content=content,
                writer=id,
                writer_token=token,
                uploaded_file=', '.join(file_list),
                registered_date=registered_date))

            try:
                database.session.commit()
                return FREE_BOARD_REGISTER_FORMAT(status=True)
            except Exception as e:
                return FREE_BOARD_REGISTER_FORMAT(status=False)

    @free_board_blueprint.route('/get_list', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_list():
        if request.method == 'POST':
            current_idx = request.json['current_idx']
            idx = 10

            query = database.session.query(FreeBoard).order_by(FreeBoard.no.desc()).all()
            len_list = len(query)

            if len_list > idx:
                query = query[idx * current_idx : idx * (current_idx + 1)]

            result = {}
            for idx, free_board in enumerate(query):
                result.setdefault(idx, {
                    "no": free_board.no,
                    "title": free_board.title,
                    "content": free_board.content,
                    "writer": free_board.writer,
                    "writer_token": free_board.writer_token,
                    "uploaded_file": free_board.uploaded_file,
                    "registered_date": free_board.registered_date,
                })

            return FREE_BOARD_LIST_FORMAT(status=True, free_board_list=result, free_board_list_length=len_list)

    @free_board_blueprint.route('/get_content', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_content():
        if request.method == 'POST':
            no = request.json['no']

            query = database.session.query(FreeBoard).filter(FreeBoard.no == no).all()
            result = {}

            for idx, free_board in enumerate(query):
                result = {
                    "no": free_board.no,
                    "title": free_board.title,
                    "content": free_board.content,
                    "writer": free_board.writer,
                    "writer_token": free_board.writer_token,
                    "uploaded_file": free_board.uploaded_file,
                    "registered_date": free_board.registered_date,
                }
                break

            return FREE_BOARD_CONTENT_FORMAT(status=True, content=result)

    @free_board_blueprint.route('/delete_content', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def delete_content():
        if request.method == 'POST':
            no = request.json['no']

            result = g.db.command("free_board/delete_content", no)

            file_list = result['FILE_LIST']

            if not file_list:
                return result

            files = file_list.split(', ')
            for f in files:
                file_path = os.path.join(stored_file_path, f)
                del_file(file_path)

            return result


    @free_board_blueprint.route('/file_upload', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def file_upload():
        if request.method == 'POST':
            f = request.files['file']
            f.save(os.path.join(stored_file_path, f.filename))
            return {"result": True}

    @free_board_blueprint.route('/file_download', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def file_download():
        if request.method == 'POST':
            file_name = request.json['file_name']

            file_path = os.path.join(stored_file_path, file_name)

            return send_file(file_path, as_attachment=True)

    def del_file(path):
        os.remove(path)

    return free_board_blueprint