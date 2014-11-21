from sqlalchemy.orm import relationship, backref

from cr.utils.json_utils import JsonSerializer
from cr.model.config import  db

class AppCategory(db.Model, JsonSerializer):
    __tablename__ = 'app_category'
    recId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    apps = relationship("App", backref=backref("app", order_by=recId))


class App(db.Model, JsonSerializer):
    __tablename__ = 'app'
    recId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    categoryId = db.Column(db.Integer, db.ForeignKey('app_category.recId'))


class CrType(db.Model, JsonSerializer):
    __tablename__ = 'cr_type'
    recId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    desc = db.Column(db.String(100))


class CrPirority(db.Model, JsonSerializer):
    __tablename__ = 'pirority'
    recId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    desc = db.Column(db.String(100))


class CrDecision(db.Model, JsonSerializer):
    __tablename__ = 'decision'
    recId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    desc = db.Column(db.String(100))


class EmployeeView(db.Model, JsonSerializer):
    __tablename__ = 'empView'
    person_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    department_name = db.Column(db.String(150))
    department_id = db.Column(db.Integer)
    email_address= db.Column(db.String(50))
    phone_number= db.Column(db.String(50))


class EmployeeAppAuthorization(db.Model, JsonSerializer):
    __tablename__ = 'empAppAuthorization'
    recId = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey('empView.person_id'))
    app_id = db.Column(db.Integer, db.ForeignKey('app.recId'))
    person = relationship("EmployeeView",backref=backref('empView', uselist=False))
    app = relationship("App",backref=backref('App', uselist=False))





    







