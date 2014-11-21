var templates={
	templateDropdown:'{{#items}}<li data-value="{{recId}}"><a href="javascript:void(0);">{{name}}</a></li>{{/items}}'
	,templateAlert:'<div class="alert {{alert}} alert-dismissable">'+
            	   '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;'+
            	   ' </button><span>{{message}}</span></div>'
}
var alerts={
	warningAlert:function(selector,msg) {
            $(selector).html(Mustache.render(templates.templateAlert,{message:msg,alert:"alert-danger"}));
        }
    ,sucessAlert:function(selector,msg){
    	$(selector).html(Mustache.render(templates.templateAlert,{message:msg,alert:"alert-success"}));
    }

}