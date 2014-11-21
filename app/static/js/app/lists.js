var cr_frm = {

    frm_data: {},
    init: function() {
        $(".dropdown-menu li").each(function() {
            var selText = $(this).text();
            var value = $(this).data("value");
            var key = $(this).parents('ul').attr("id");
            cr_frm.frm_data[key] = value;
        });
    },
    loadLists: function(lst) {

        return Mustache.render(templates.templateDropdown, {
            items: lst
        });

    },
    createBasicDataLists: function() {
        $.getJSON('/cr/loadAllData', function(json, textStatus) {
            $(cr_frm.loadLists(json.data.pirority)).appendTo("#Pirority");
            $(cr_frm.loadLists(json.data.types)).appendTo("#ChangeType");
        });
    },
    refreshActions: function() {

        $(".dropdown-menu li").click(function() {
            var selText = $(this).text();
            var value = $(this).data("value");
            var key = $(this).parents('ul').attr("id");
            cr_frm.frm_data[key] = value;
            $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');

        });

    },
    loadEmployeeData: function(refreshLists) {
        $.getJSON('/cr/loadEmpApp/440', function(json, textStatus) {
            var person = $.parseJSON(json.data.person);
            var apps = [];
            $.each(json.data.apps, function(index, val) {
                apps.push($.parseJSON(val.app));
            });
            $("#EmployeeName").val(person.name);
            $("#EmployeeName").data("EmployeeId", person.person_id);
            $("#EmailAddress").val(person.email_address);
            $("#PhoneNumber").val(person.phone_number);
            $("#DepartmentName").val(person.department_name);
            $(cr_frm.loadLists(apps)).appendTo("#Apps");
            refreshLists();

        });
    },
    sumbitForm: function() {

        if (cr_frm.validateInputs()) {
            $.post('/cr/submitcr', cr_frm.frm_data, function(data, textStatus, xhr) {
                console.log(data);
                alerts.sucessAlert("#alert_placeholder", "Saved Success");
            });

        } else {
            alerts.warningAlert("#alert_placeholder", "Kindly Fill The Requested Data");
        }

    },
    getFormData: function() {

        cr_frm.frm_data.submitterName = $("#EmployeeName").val();
        cr_frm.frm_data.EmailAddress = $("#EmailAddress").val();
        cr_frm.frm_dataDepartmentName = $("#DepartmentName").val();
        cr_frm.frm_data.PhoneNumber = $("#PhoneNumber").val();
        cr_frm.frm_data.Reason = $("#Reason").val();
        cr_frm.frm_data.DescChange = $("#DescChange").val();
        cr_frm.frm_data.Comments = $("#Comments").val();
        cr_frm.frm_data.PersonId = $("#EmployeeName").data("EmployeeId");
        cr_frm.frm_data.CRCode=$("#CRCode").val();

    },
    validateInputs: function() {
        cr_frm.getFormData();
        var checked_success=true;
        if (cr_frm.frm_data.Reason === "") 
        {
            $("#ReasonContainer").addClass("has-error");
              checked_success=false;
        }
        if(cr_frm.frm_data.Pirority == undefined){
            $("#PirorityContainer").addClass("has-error");
            checked_success=false;
        } 
          if(cr_frm.frm_data.ChangeType == undefined){
            $("#ChangeTypeContainer").addClass("has-error");
            checked_success=false;
        }
         if(cr_frm.frm_data.Apps== undefined){
            $("#AppsContainer").addClass("has-error");
            checked_success=false;
        }
        if(checked_success){
            $(".Mandatory").removeClass("has-error");
        }
        
        return checked_success; 
    }
};
$(document).ready(function() {
    var creator = cr_frm;
    creator.createBasicDataLists();
    creator.loadEmployeeData(creator.refreshActions);
    $("#submitButton").click(function(event) {
    
         creator.sumbitForm();
    });
});