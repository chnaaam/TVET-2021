import os
from datetime import datetime
from flask import request, g, Blueprint, send_file
from flask_cors import cross_origin

from src.database.notice_board import NoticeBoard
from src.utils.notice_board_format import *

def construct_notice_board_blueprint(database, stored_file_path):
    notice_board_blueprint = Blueprint('notice_board', __name__, url_prefix="/notice_board")

    @notice_board_blueprint.route('/register', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def register():
        if request.method == 'POST':
            id = request.json['user_id']
            token = request.json['user_token']
            title = request.json['title']
            content = request.json['content']
            file_list = request.json['file_name_list']
            registered_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            query = database.session.query(NoticeBoard).order_by(NoticeBoard.no.desc()).all()

            if query:
                query = query[0]
                database.session.add(NoticeBoard(
                    no=query.no + 1,
                    title=title,
                    content=content,
                    writer=id,
                    writer_token=token,
                    uploaded_file=', '.join(file_list),
                    registered_date=registered_date))
            else:
                database.session.add(NoticeBoard(
                    no=1,
                    title=title,
                    content=content,
                    writer=id,
                    writer_token=token,
                    uploaded_file=', '.join(file_list),
                    registered_date=registered_date))


            try:
                database.session.commit()
                return NOTICE_BOARD_REGISTER_FORMAT(status=True)
            except Exception as e:
                return NOTICE_BOARD_REGISTER_FORMAT(status=False)

    @notice_board_blueprint.route('/get_list', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_list():
        if request.method == 'POST':
            current_idx = request.json['current_idx']
            idx = 10

            query = database.session.query(NoticeBoard).order_by(NoticeBoard.no.desc()).all()
            len_list = len(query)
            if len(query) > idx:
                query = query[idx * current_idx: idx * (current_idx + 1)]

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

            return NOTICE_BOARD_LIST_FORMAT(status=True, notice_board_list=result, notice_board_list_length=len_list)

    @notice_board_blueprint.route('/get_content', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_content():
        if request.method == 'POST':
            no = request.json['no']

            query = database.session.query(NoticeBoard).filter(NoticeBoard.no == no).all()
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

            return NOTICE_BOARD_CONTENT_FORMAT(status=True, content=result)

    @notice_board_blueprint.route('/delete_content', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def delete_content():
        if request.method == 'POST':
            no = request.json['no']

            result = g.db.command("notice_board/delete_content", no)

            file_list = result['FILE_LIST']

            if not file_list:
                return result

            files = file_list.split(', ')
            for f in files:
                file_path = os.path.join(stored_file_path, f)
                del_file(file_path)

            return result


    @notice_board_blueprint.route('/file_upload', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def file_upload():
        if request.method == 'POST':
            f = request.files['file']
            f.save(os.path.join(stored_file_path, f.filename))
            return {"result": True}

    @notice_board_blueprint.route('/file_download', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def file_download():
        if request.method == 'POST':
            file_name = request.json['file_name']

            file_path = os.path.join(stored_file_path, file_name)

            return send_file(file_path, as_attachment=True)

    def del_file(path):
        os.remove(path)

    return notice_board_blueprint