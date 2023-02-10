$(document).ready(function(){	
	var pjax = new Pjax({
		elements: ".pjax-load",
		selectors: [
		 	".eclo-content",
		],
		cacheBust: false,
  	});
	var domain = 'https://school.hewo.vn/';
    var token = localStorage.getItem("token");
    var pathname = window.location.pathname;
    if(token===null){
       pjax.loadUrl('index.html');
    }
    // console.log(window.location);
	$(document).on('pjax:send', topbar.show);
  	$(document).on('pjax:complete', topbar.hide);
  	$(document).on('pjax:success', whenDOMReady);
  	$(document).on('pjax:error', errorload);
  	whenDOMReady();
	function whenDOMReady() {
		$(document).on("submit",'.login-form',function (e){
	        e.preventDefault();
	        e.stopImmediatePropagation();
	        // var formData = new FormData($(this)[0]);
	        $('.login-submit').attr('disabled','disabled');
	        var phone_number = $(".login-form").find("input[name=phone_number]").val();
	        var password = $(".login-form").find("input[name=password]").val();
	        topbar.show();
	        $.ajax({
	            type:'POST',
	            url: domain+'api/login/',
	            data: JSON.stringify({"phone_number":phone_number,"password":password}),
	            cache:false,
	            contentType: false,
	            processData: false,
	            contentType: 'application/json',
	            success:function(data){
	                if(data.status=='error'){
	                    topbar.hide();
	                    $('.login-submit').removeAttr('disabled','disabled');
	                    alert("Tài khoản hoặc mật khẩu không đúng");
	                    $('input').val('');
	                }
	                if(data.status=='success'){
	                    topbar.hide();
	                    $('.login-submit').removeAttr('disabled','disabled');
	                    localStorage.setItem("token",data.token);
	                    pjax.loadUrl('dashboard.html');
	                }
	            }
	        });
	    });
	}
	function errorload(){
		alert("Lỗi kết nối");
	}
});