import random
import unittest
from werkzeug.datastructures import ImmutableMultiDict
from cr.model.dao.basic_dao import BasicDataDao
class TestSequenceFunctions(unittest.TestCase):

    def setUp(self):
        self.seq = range(10)
        self.data= ImmutableMultiDict([('DescChange', u'fdsf'), ('submitterName', u'\u0622\u062d\u0645\u062f'), ('PersonId', u'440'),
         ('ChangeType', u'3'), ('Apps', u'2'), ('Comments', u'fdsf'), ('Reason', u'fdsf'), ('PhoneNumber', u'333'),
         ('Pirority', u'4'),('CRCode', u'22/44'), ('EmailAddress', u'Ahmed@dd.cc')])
        self.instance=BasicDataDao()


    def testInsert(self):
        assert self.instance.insert_new_cr(self.data)



if __name__ == '__main__':
    unittest.main()