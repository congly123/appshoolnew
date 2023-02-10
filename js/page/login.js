$(document).ready(function(){   
    
    var domain = 'https://school.hewo.vn/';
    var token = localStorage.getItem("token");
    if(token!==null){
    //    pjax.loadUrl('dashboard.html');
    }
    // console.log(window.location);
    $(document).on("submit",'.login-form',function (e){
        e.preventDefault();
        e.stopImmediatePropagation();
        // var formData = new FormData($(this)[0]);
        $('.login-submit').attr('disabled','disabled');
        var phone_number = $(".login-form").find("input[name=phone_number]").val();
        var password = $(".login-form").find("input[name=password]").val();
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
                    $('.login-submit').removeAttr('disabled','disabled');
                    alert("Tài khoản hoặc mật khẩu không đúng");
                    $('input').val('');
                }
                if(data.status=='success'){
                    $('.login-submit').removeAttr('disabled','disabled');
                    localStorage.setItem("token",data.token);
                    // pjax.loadUrl('dashboard.html');
                    window.location.href = 'dashboard.html';
                }
            }
        });
    });
});