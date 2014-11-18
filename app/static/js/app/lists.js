
var cr_frm={ 
	
	frm_data: {}
	,init:function(){
		$(".dropdown-menu li").each(function(){
			var selText = $(this).text();
			var value= $(this).data("value");
			var key=$(this).parents('ul').attr("id");
			cr_frm.frm_data[key]=value;
		});
	}
	,loadLists:function(lst){
		var template='{{#items}}<li data-value="{{recId}}"><a href="javascript:void(0);">{{name}}</a></li>{{/items}}';
		return Mustache.render(template,{items:lst});	

	},
	createBasicDataLists:function(){
		$.getJSON('/cr/loadAllData', function(json, textStatus) {
			$(cr_frm.loadLists(json.data.pirority)).appendTo("#Pirority");
			$(cr_frm.loadLists(json.data.types)).appendTo("#ChangeType");
		});
	},
	refreshActions:function(){

		$(".dropdown-menu li").click(function(){
			var selText = $(this).text();
			var value= $(this).data("value");
			var key=$(this).parents('ul').attr("id");
			cr_frm.frm_data[key]=value;
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
			$("#EmployeeName").val(person.name);
			$("#EmployeeName").data("EmployeeId",person.person_id);
			$("#EmailAddress").val(person.email_address);
			$("#PhoneNumber").val(person.phone_number);
			$("#DepartmentName").val(person.department_name);
			$(cr_frm.loadLists(apps)).appendTo("#Apps");
			refreshLists();

		});
	},
	sumbitForm:function(){
		
		if(cr_frm.validateInputs()){
			$.post('/cr/submitcr', cr_frm.frm_data, function(data, textStatus, xhr) {
				console.log(textStatus);
			});

		}
		else{
			tools.warningAlert("#alert_placeholder","Kindly Fill The Requested Data");
		}
		
		


	}
	,getFormData:function(){
		
		cr_frm.frm_data.submmitterName=$("#EmployeeName").val();
		cr_frm.frm_data.EmailAddress=$("#EmailAddress").val();
		cr_frm.frm_dataDepartmentName=$("#DepartmentName").val();
		cr_frm.frm_data.PhoneNumber=$("#PhoneNumber").val();
		cr_frm.frm_data.Reason=$("#Reason").val();
		cr_frm.frm_data.DescChange=$("#DescChange").val();
		cr_frm.frm_data.Comments=$("#Comments").val();
		cr_frm.frm_data.PersonId=$("#EmployeeName").data("EmployeeId");
		console.log(this.frm_data);
	}
	,validateInputs:function(){
		cr_frm.getFormData();
		if(cr_frm.frm_data.Reason===""||cr_frm.frm_data.Pirority==undefined
			  ||cr_frm.frm_data.ChangeType==undefined||cr_frm.frm_data.Apps==undefined){
			console.log("Checking Failed");
			return false;
		}
			console.log("Checking Succeded");
		return true;

	}
};
$(document).ready(function(){
	var creator=cr_frm;
	creator.createBasicDataLists();
	creator.loadEmployeeData(creator.refreshActions);
	$("#submitButton").click(function(event) {
		creator.sumbitForm();
	});
});
