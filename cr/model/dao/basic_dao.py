from cr.model.entity.basicdata import EmployeeAppAuthorization
from cr.model.entity.crinfo import  CrInfo


class BasicDataDao():
    def __init__(self):
        pass

    def get_apps(self, personId):
        results = EmployeeAppAuthorization.query.filter(EmployeeAppAuthorization.person_id == personId)
        return results

    def insert_new_cr(self,cr_params):
        """
        ImmutableMultiDict([('DescChange', u'fdsf'), ('submmitterName', u'\u0622\u062d\u0645\u062f'), ('PersonId', u'440'),
         ('ChangeType', u'3'), ('Apps', u'2'), ('Comments', u'fdsf'), ('Reason', u'fdsf'), ('PhoneNumber', u'333'),
         ('Pirority', u'4'), ('EmailAddress', u'Ahmed@dd.cc')])

        """
        cr=CrInfo()

        cr.app_id=cr_params['Apps']
        cr.comments=cr_params['Comments']
        cr.pirority_id=cr_params['Pirority']
        cr.cr_type_id=cr_params['ChangeType']
        cr.description=cr_params['DescChange']
        cr.submitter_email=cr_params['EmailAddress']
        cr.reason=cr_params['Reason']
        cr.cr_code=cr_params['CRCode']
        cr.submitter_name=cr_params['submitterName']
        cr.submitter_person_id=cr_params['PersonId']

        db_session=cr.get_session()
        db_session.add(cr)
        db_session.commit()
        return 'Inserted'









