import os
from flask import request, g, Blueprint, send_file
from datetime import datetime
from flask_cors import cross_origin, CORS
from src.utils.archive_format import *
from src.database.archive import Archive

def construct_archive_blueprint(database, stored_file_path):
    archive_blueprint = Blueprint('archive', __name__, url_prefix="/archive")
    CORS(archive_blueprint)

    @archive_blueprint.route('/register', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def register():
        if request.method == 'POST':
            id = request.json['user_id']
            token = request.json['user_token']
            title = request.json['title']
            content = request.json['content']
            file_list = request.json['file_name_list']
            registered_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            query = database.session.query(Archive).order_by(Archive.no.desc()).all()
            query = query[0]

            database.session.add(Archive(
                no=query.no + 1,
                title=title,
                content=content,
                writer=id,
                writer_token=token,
                uploaded_file=', '.join(file_list),
                registered_date=registered_date))

            try:
                database.session.commit()
                return ARCHIVE_REGISTER_FORMAT(status=True)
            except Exception as e:
                return ARCHIVE_REGISTER_FORMAT(status=False)

    @archive_blueprint.route('/get_list', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_list():
        if request.method == 'POST':
            current_idx = request.json['current_idx']
            idx = 10

            query = database.session.query(Archive).order_by(Archive.no.desc()).all()

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

            return ARCHIVE_LIST_FORMAT(status=True, archive_list=result)

    @archive_blueprint.route('/get_content', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_content():
        if request.method == 'POST':
            no = request.json['no']

            query = database.session.query(Archive).filter(Archive.no == no).all()
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

            return ARCHIVE_CONTENT_FORMAT(status=True, content=result)

    @archive_blueprint.route('/delete_content', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def delete_content():
        if request.method == 'POST':
            no = request.json['no']

            result = g.db.command("archive/delete_content", no)

            file_list = result['FILE_LIST']

            if not file_list:
                return result

            files = file_list.split(', ')
            for f in files:
                file_path = os.path.join(stored_file_path, f)
                del_file(file_path)

            return result


    @archive_blueprint.route('/file_upload', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def file_upload():
        if request.method == 'POST':
            f = request.files['file']
            f.save(os.path.join(stored_file_path, f.filename))
            return {"result": True}

    @archive_blueprint.route('/file_download', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def file_download():
        if request.method == 'POST':
            file_name = request.json['file_name']

            file_path = os.path.join(stored_file_path, file_name)

            return send_file(file_path, as_attachment=True)

    def del_file(path):
        os.remove(path)

    return archive_blueprint