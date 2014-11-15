from cr.model.entity.basicdata import *


class BasicDataDao():
    def __init__(self):
        pass

    def get_apps(self, personId):
        results = EmployeeAppAuthorization.query.filter(EmployeeAppAuthorization.person_id == personId)
        return results





