
from flask import Flask
import pymysql as pm
from flask.ext.sqlalchemy import SQLAlchemy

class Config:

    def __init__(self,name="CR"):
        self.app = Flask(name)
        self.db = SQLAlchemy(self.app)
        pm.install_as_MySQLdb()
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/shuracr'
        self.db.init_app(self.app)
    def get_current_db(self):

        return self.db
    def get_current_app(self):
        return self.app









