
var creator_form={ 
	
	frm_data: {}
	,init:function(){
		$(".dropdown-menu li").each(function(){
			var selText = $(this).text();
			var value= $(this).data("value");
			var key=$(this).parents('ul').attr("id");
			creator_form.frm_data[key]=value;
		});
	}
	,loadLists:function(lst){
		var template='{{#items}}<li data-value="{{recId}}"><a href="javascript:void(0);">{{name}}</a></li>{{/items}}';
		return Mustache.render(template,{items:lst});	

	},
	createBasicDataLists:function(){
		$.getJSON('/cr/loadAllData', function(json, textStatus) {
			$(creator_form.loadLists(json.data.pirority)).appendTo("#Pirority");
			$(creator_form.loadLists(json.data.types)).appendTo("#ChangeType");
		});
	},
	refreshActions:function(){

		$(".dropdown-menu li").click(function(){
			var selText = $(this).text();
			var value= $(this).data("value");
			var key=$(this).parents('ul').attr("id");
			creator_form.frm_data[key]=value;
			$(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');

		});

	},
	loadEmployeeData:function(refreshLists){
		$.getJSON('/cr/loadEmpApp/440', function(json, textStatus) {
			var person=$.parseJSON( json.data.person);
			var apps=[];
			$.each(json.data.apps, function(index, val) {
				apps.push($.parseJSON(val.app));
			});
			$("#EmployeeName").val(person["name"]);
			$("#EmployeeName").data("EmployeeId",person.person_id);
			$("#EmailAddress").val(person.email_address);
			$("#PhoneNumber").val(person.phone_number);
			$("#DepartmentName").val(person.department_name);
			$(creator_form.loadLists(apps)).appendTo("#Apps");
			refreshLists();

		});
	},
	sumbitForm:function(){
		
		creator_form.getFormData();
		$.post('/cr/submitcr', creator_form.frm_data, function(data, textStatus, xhr) {
			console.log(textStatus);
		});


	}
	,getFormData:function(){
		
		creator_form.frm_data["submmitterName"]=$("#EmployeeName").val();
		creator_form.frm_data["EmailAddress"]=$("#EmailAddress").val();
		creator_form.frm_data["DepartmentName"]=$("#DepartmentName").val();
		creator_form.frm_data["PhoneNumber"]=$("#PhoneNumber").val();
		creator_form.frm_data["Reason"]=$("#Reason").val();
		creator_form.frm_data["DescChange"]=$("#DescChange").val();
		creator_form.frm_data["Comments"]=$("#Comments").val();
		creator_form.frm_data["PersonId"]=$("#EmployeeName").data("EmployeeId");
		console.log(creator_form.frm_data);
	}
};
$(document).ready(function(){
	var creator=creator_form;
	creator.createBasicDataLists();
	creator.loadEmployeeData(creator.refreshActions);
	$("#submitButton").click(function(event) {
		creator.sumbitForm();
	});
});
