from sqlalchemy.orm import relationship, backref

from cr.utils.json_utils import JsonSerializer
from cr.controllers.config import Config


db = Config().get_current_db()

class CrInfo(db.Model, JsonSerializer):
    __tablename__ = 'app_category'
    recId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    apps = relationship("App", backref=backref("app", order_by=recId))