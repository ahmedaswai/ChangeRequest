
from basicdata import *
from sqlalchemy import UnicodeText
db = Config().get_current_db()

class CrInfo(db.Model, JsonSerializer):
    __tablename__ = 'cr_info'
    recId = db.Column(db.Integer, primary_key=True)
    cr_code =db.Column(db.String(45))
    submitter_name=db.Column(UnicodeText(100,convert_unicode=False))
    submitter_email=db.Column(db.String(45))
    submitter_dep_name=db.Column(UnicodeText(100,convert_unicode=False))
    submitter_person_id=db.Column(db.Integer)

    cr_type_id=db.Column(db.Integer,db.ForeignKey('cr_type.recId'))
    app_id=db.Column(db.Integer,db.ForeignKey('app.recId'))
    pirority_id=db.Column(db.Integer,db.ForeignKey('pirority.recId'))


    cr_type = relationship(CrType,backref=backref('cr_type', uselist=False))
    cr_app = relationship(App,backref=backref('app', uselist=False))
    pirority = relationship(CrPirority,backref=backref('pirority', uselist=False))

    description=db.Column(UnicodeText(400,convert_unicode=False))
    reason=submitter_dep_name=db.Column(UnicodeText(250,convert_unicode=False))
    comments=db.Column(UnicodeText(400,convert_unicode=False))
    date_submitted_greg=db.Column(db.Date)
    data_submitted_hijri=db.Column(db.BigInteger)
    def get_session(self):
        return db.session()
