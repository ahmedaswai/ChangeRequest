
var loadLists=function(lst){
	var template='{{#items}}<li data-value="{{recId}}"><a href="#">{{name}}</a></li>{{/items}}';
	return Mustache.render(template,{items:lst});	

}
var createBasicDataLists=function(refreshLists){
	$.getJSON('/cr/loadAllData', function(json, textStatus) {
		$(loadLists(json.data.pirority)).appendTo("#Pirority");
		$(loadLists(json.data.types)).appendTo("#ChangeType");
		refreshLists();
		
	});
}
var refreshActions=function(){
	$(".dropdown-menu li a").click(function(){
			var selText = $(this).text();
			$(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');

		});
}
var loadEmployeeData=function(refreshLists){
    $.getJSON('/cr/loadEmpApp/440', function(json, textStatus) {
    	 var person=$.parseJSON( json.data.person);
    	 var apps=[];
    	 
    	 $.each(json.data.apps, function(index, val) {
    	 	apps.push($.parseJSON(val.app));
    	 });
    	 $("#EmployeeName").val(person["name"]);
    	 $("#EmailAddress").val(person.email_address);
    	 $("#PhoneNumber").val(person.phone_number);
    	 $("#DepartmentName").val(person.department_name);
    	 $(loadLists(apps)).appendTo("#Apps");
    	 refreshLists();
    	  
    });
}
var sumbitForm=function(){
	var params={};
	params["submmitterName"]=$("#EmployeeName").val();
	params["EmailAddress"]=$("#EmailAddress").val();
	params["DepartmentName"]=$("#DepartmentName").val();
	$.post('/cr/submitcr', params, function(data, textStatus, xhr) {
		console.log(textStatus);
	});
	

}
$(document).ready(function(){
	createBasicDataLists(refreshActions);
	loadEmployeeData(refreshActions);
    $("#submitButton").click(function(event) {
    	sumbitForm();
    });
});
