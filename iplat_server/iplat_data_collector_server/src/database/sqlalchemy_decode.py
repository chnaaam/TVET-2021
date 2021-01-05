import json

class SQLAlchemyUtils:

    @classmethod
    def decode(cls, data):
        return json.loads(data)