from flask import jsonify,request

from cr.model.entity.basicdata import *
from cr.model.config import *
from cr.model.dao.basic_dao import BasicDataDao

app = Config().get_current_app()


@app.route('/cr/categoryApps', methods=['GET'])

def apps_category():
    results = AppCategory.query.all()
    json_results = [{'recid': result.recId, 'name': result.name,
                             'apps': [i.to_json() for i in result.apps]} for result in results]
    return jsonify(data=json_results)


@app.route('/cr/loadAllData', methods=['GET'])
def load_data():
    json_results=dict()
    json_results ['types']= [{'recId': result.recId, 'name': result.name} for result in CrType.query.all()]
    json_results['pirority']=[{'recId': result.recId, 'name': result.name} for result in CrPirority.query.all()]
    json_results['decisions']=[{'recId': result.recId, 'name': result.name} for result in CrDecision.query.all()]
    return jsonify(data=json_results)

@app.route('/cr/submitcr',methods=['POST'])
def submit_form():
    return BasicDataDao().insert_new_cr(request.form)


@app.route('/cr/loadEmpApp/<int:emp_id>', methods=['GET'])
def get_emp_apps(emp_id):
    results=BasicDataDao().get_apps(emp_id)
    json_results=dict()
    emp=results[0].person
    json_results["person"]=emp.to_json()
    json_results["apps"]=[{"app":result.app.to_json()} for result in results]
    return jsonify(data=json_results)

@app.route('/cr/', methods=['GET'])
def load_index_html():
    return app.send_static_file("html/index.html")
if __name__ == '__main__':
    app.run(debug=True)