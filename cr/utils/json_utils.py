from flask import json

class JsonSerializer(object):
    def __init__(self):
          mysql_engine = 'InnoDB',
          mysql_charset = 'utf8'
    @property
    def columns(self):
        return [ c.name for c in self.__table__.columns ]

    @property
    def columnitems(self):
        return dict([ (c, getattr(self, c)) for c in self.columns ])
    def to_json(self):
        return json.htmlsafe_dumps(self.columnitems)
