var tools={
	warningAlert:function(selector,message) {
            $(selector).html('<div class="alert alert-danger alert-dismissable">'+
            	'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;'+
            	'</button><span>'+message+'</span></div>');
        }

}