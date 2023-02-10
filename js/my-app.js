var apiurl = 'https://gym.ms/api.1.1/';
var siteurl = 'https://gym.ms';
var sysurl = 'https://system.mansys.vn/';
var $$ = Dom7;
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'MANSYS GYM',
  // App id
  id: 'com.mansys.gymapp',
  touch: {
    // Enable fast clicks
    // tapHold: true,
    // fastClicks:true,
  },
  view: {
    pushState : true,
    iosDynamicNavbar: false,
  },
  statusbar: {
    iosOverlaysWebView: true,
    iosBackgroundColor: "#007bff",
    androidBackgroundColor:"#007bff",
    iosTextColor: "white",
    androidTextColor: "white",
  },
  // Add default routes
  routes: [
    {
      path: '/',
      url: 'index.html',
    },
    {
      path: '/login/',
      url: 'login.html',
      on: {
        pageInit: function () {
          $$('.form-login').on('submit',function (e){
              app.preloader.show();
              var formData = new FormData($$(this)[0]);
                  formData.append('login','');
              app.request.post(apiurl+'login',formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    localStorage.token = getData.token;
                    localStorage.customers = getData.customers;
                    localStorage.phone = getData.phone;
                    localStorage.images = getData.images;
                    if(getData.token!==''){
                      mainView.router.navigate('/home/', {reloadAll: true});
                    }
                  }
                },
                function(xhr,status){
                  app.preloader.hide();
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          }); 
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/confirm/',
      url: 'confirm.html',
      on: {
        pageInit: function () {
           $$('.form-comfirm').on('submit',function (e){
              var formData = new FormData($$(this)[0]);
              app.request.post( apiurl+'confirm',formData,
                function (data) {
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    localStorage.customers = getData.customers;
                    localStorage.phone = getData.phone;
                    if(localStorage.phone){
                      if(getData.content=="verify"){
                          mainView.router.navigate('/verify/', {transition: ''});
                      }
                    }
                  }
                },
                function(xhr,status){
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          });
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/verify/',
      url: 'verify.html',
      on: {
        pageInit: function () {
          $$('.form-verify',).on('submit',function (e){
            app.preloader.show();
            var formData = new FormData($$(this)[0]);
                formData.append('phone',localStorage.phone);
            app.request.post(apiurl+'verify',formData, 
              function (data) {
                app.preloader.hide();
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  mainView.router.navigate('/register/', {transition: ''});
                }
              },
              function(xhr,status){
                app.preloader.hide();
                app.dialog.alert('Lỗi không thể kết nối mạng');
              }
            );
          });
          $$('.reset-verify').on('click',function (e){
              app.preloader.show();
              var formData = new FormData();
                  formData.append('phone',localStorage.phone);
              app.request.post(apiurl+'reset-verify',formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    app.dialog.alert(getData.content).reload;
                  }
                },
                function(xhr,status){
                  app.preloader.hide();
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          });
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/register/',
      url: 'register.html',
      on: {
        pageInit: function () {
          $$('.form-register').on('submit',function (e){
              app.preloader.show();
              var formData = new FormData($$(this)[0]);
                  formData.append('phone',localStorage.phone);
              app.request.post(apiurl+'register',formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    localStorage.token = getData.token;
                    localStorage.customers = getData.customers;
                    localStorage.images = getData.images;
                    localStorage.phone = getData.phone;
                    if(localStorage.token!=''){
                      mainView.router.navigate('/home/', {reloadAll: true});
                    }
                  }
                },
                function(xhr,status){
                  app.preloader.hide();
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          }); 
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/forget/',
      url: 'forget.html',
      on: {
        pageInit: function () {
           $$('.form-forget').on('submit',function (e){
              var formData = new FormData($$(this)[0]);
              app.request.post(apiurl+'forget',formData,
                function (data) {
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    localStorage.customers = getData.customers;
                    localStorage.phone = getData.phone;
                    if(localStorage.phone){
                      if(getData.content=="verify-forget"){
                          mainView.router.navigate('/verify-forget/', {transition: ''});
                      }
                    }
                  }
                },
                function(xhr,status){
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          });
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/verify-forget/',
      url: 'verify-forget.html',
      on: {
        pageInit: function () {
          $$('.form-verify',).on('submit',function (e){
            app.preloader.show();
            var formData = new FormData($$(this)[0]);
                formData.append('phone',localStorage.phone);
            app.request.post(apiurl+'verify-forget',formData, 
              function (data) {
                app.preloader.hide();
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  mainView.router.navigate('/forget-password/', {transition: ''});
                }
              },
              function(xhr,status){
                app.preloader.hide();
                app.dialog.alert('Lỗi không thể kết nối mạng');
              }
            );
          });
          $$('.reset-verify').on('click',function (e){
              app.preloader.show();
              var formData = new FormData();
                  formData.append('phone',localStorage.phone);
              app.request.post(apiurl+'reset-verify-forget',formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    app.dialog.alert(getData.content).reload;
                  }
                },
                function(xhr,status){
                  app.preloader.hide();
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          });
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/forget-password/',
      url: 'forget-password.html',
      on: {
        pageInit: function () {
          $$('.form-register').on('submit',function (e){
              app.preloader.show();
              var formData = new FormData($$(this)[0]);
                  formData.append('phone',localStorage.phone);
              app.request.post(apiurl+'forget-password',formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    localStorage.token = getData.token;
                    localStorage.customers = getData.customers;
                    localStorage.images = getData.images;
                    localStorage.phone = getData.phone;
                    if(localStorage.token!=''){
                      mainView.router.navigate('/home/', {reloadAll: true});
                    }
                  }
                },
                function(xhr,status){
                  app.preloader.hide();
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          }); 
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/home/',
      url: 'home.html',
      on: {
        pageInit: function () {
          if(localStorage.getItem("companies_id")!==null && localStorage.getItem("qrcode")!==null){
            $$('.home-infomation .name-account').text(localStorage.customers);
            $$('.home-infomation .name-companies').text(localStorage.companies_name);
            $$('.home-infomation .last-checkin').text(localStorage.phone);
            app.request.post(
              apiurl+'advertisement',{'qrcode':localStorage.qrcode,'token':localStorage.token},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.home-banner .swiper-container .swiper-wrapper').append('<div class="swiper-slide" style="background:url('+array[key].url_images+array[key].images+') no-repeat top center"><a href=""></a></div>');
                  });
                  var swiper = app.swiper.create('.swiper-container', {
                      slidesPerView: 'auto',
                      spaceBetween: 10,
                      centeredSlides: true,
                      loop: true,
                      // pagination: {
                      //   el: '.swiper-pagination',
                      //   clickable: true,
                      // },
                      autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                      },
                  });
                }
              },
              function(xhr,status){
                if(status==200){
                  app.dialog.alert(status);
                }
              }
            );
            app.request.post(
              apiurl+'products',{'qrcode':localStorage.qrcode,'token':localStorage.token,'type':'new'},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.home-swiper-products-new .swiper-wrapper').append('<div class="swiper-slide">'+
                      '<div class="card card-products">'+
                        '<div class="card-header"><a class="link item-link item-content" href="/views-products/'+array[key].id+'/"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" class="images"></a></div>'+
                        '<div class="card-content card-content-padding">'+
                          '<strong class="price">'+array[key].price_number+'</strong>'+
                          '<strong class="name">'+array[key].name+'</strong>'+
                        '</div>'+
                        '</div>');
                  });
                  var swiper = app.swiper.create('.home-swiper-products-new .swiper-container', {
                      slidesPerView: '2',
                      spaceBetween: 10,
                      // centeredSlides: true,
                      loop: true,
                      autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                      },
                  });
                }
              },
              function(xhr,status){
                if(status==200){
                  app.dialog.alert(status);
                }
              }
            );
            app.request.post(
              apiurl+'products',{'qrcode':localStorage.qrcode,'token':localStorage.token,'type':'top'},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.home-swiper-products-top .swiper-wrapper').append('<div class="swiper-slide">'+
                      '<div class="card card-products">'+
                        '<div class="card-header"><a class="link item-link item-content" href="/views-products/'+array[key].id+'/"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" class="images"></a></div>'+
                        '<div class="card-content card-content-padding">'+
                          '<strong class="price">'+array[key].price_number+'</strong>'+
                          '<strong class="name">'+array[key].name+'</strong>'+
                        '</div>'+
                        '</div>');
                  });
                  var swiper = app.swiper.create('.home-swiper-products-top .swiper-container', {
                      slidesPerView: '2',
                      spaceBetween: 10,
                      // centeredSlides: true,
                      loop: true,
                      autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                      },
                  });
                }
              },
              function(xhr,status){
                if(status==200){
                  app.dialog.alert(status);
                }
              }
            );
          } 
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/checkin/',
      url: 'checkin.html',
      on: {
        pageInit: function () {
          $("#qrcode").html('');
          $("#qrcode").qrcode({
            background: "#fff",
            foreground: "#000000",
            text:localStorage.qrcode,
          });
          $$('.name-companies').text(localStorage.companies_name);
          $$('.name-branch').text(localStorage.branch_name);
          $$('.name-address').text(localStorage.branch_address);
          $$('.name-customers').text(localStorage.customers);
          $$("#change-companies").on('click',function(){
              getcompanies();
          });
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/invoices/',
      url: 'invoices.html',
      on: {
        pageInit: function () {
          app.request.post(
            apiurl+'invoices',{'qrcode':localStorage.qrcode,'token':localStorage.token},
            function (data) {
              var getData = JSON.parse(data);
              if(getData.status=='error'){
                app.dialog.alert(getData.content);
              }
              if(getData.status=='success'){
                array = getData.content;
                Object.keys(array).forEach(function(key){
                  if(array[key].count_status=='red' || array[key].count_status=='green'){
                    $$('.page-content.invoices .list .item-invoices.invoices-new').append('<li>'+
                    '<a class="link item-link item-content" href="/views-invoices/'+array[key].id+'/">'+
                    '<div class="item-inner">'+
                      '<div class="item-title-row">'+
                        '<div class="item-count bg-color-'+array[key].count_status+'">'+array[key].count_update+'</div>'+
                        '<div class="item-title">'+
                          '<div class="item-text-title">#'+array[key].code+' - '+array[key].services+'</div>'+
                          '<div class="item-text"><i class="f7-icons">calendar</i> '+array[key].date_from+' - '+array[key].date_to+'</div>'+
                          '<div class="item-text"><i class="f7-icons">alarm</i> '+array[key].count_down+'</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '</a>'+
                    '</li>');
                  }
                  else {
                    $$('.page-content.invoices .list .item-invoices.invoices-old').append('<li>'+
                    '<a class="link item-link item-content" href="/views-invoices/'+array[key].id+'/">'+
                    '<div class="item-inner">'+
                      '<div class="item-title-row">'+
                        '<div class="item-count bg-color-'+array[key].count_status+'">'+array[key].count_update+'</div>'+
                        '<div class="item-title">'+
                          '<div class="item-text-title">#'+array[key].code+' - '+array[key].services+'</div>'+
                          '<div class="item-text"><i class="f7-icons">calendar</i> '+array[key].date_from+' - '+array[key].date_to+'</div>'+
                          '<div class="item-text"><i class="f7-icons">alarm</i> '+array[key].count_down+'</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '</a>'+
                    '</li>');
                  }
                });
              }
            },
            function(xhr,status){
              app.dialog.alert('Lỗi không thể kết nối mạng');
              $$('.page-content.invoices .list .item-invoices').html('<div class="error-disconnect"><i class="f7-icons">wifi_exclamationmark</i></div>');
            }
          );
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/views-invoices/:invoicesId/',
      url: 'views-invoices.html',
      on: {
        pageInit: function (e,page) {
         app.request.post(
               apiurl+'views-invoices/'+page.route.params.invoicesId,{'qrcode':localStorage.qrcode,'token':localStorage.token},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  $$('.invoices-code').text(getData.content.code);
                  $$('.views-invoices-status').html('<span class="title">Còn lại</span>'+getData.content.count_update);
                  $$('.views-invoices-name').addClass('bg-color-'+getData.content.count_status);
                  $$('.invoices-bg-color .navbar-bg').addClass('bg-color-'+getData.content.count_status);
                  $$('.invoices-bg-color').addClass('invoices-color-'+getData.content.count_status);
                  $$('.views-invoices-date .date').html(''+getData.content.date_from+'<br>'+getData.content.date_to);
                  $$('.views-invoices-date .time').html('Giá trị '+getData.content.value_total+' '+getData.content.type+'<br> Tặng '+getData.content.gift+' '+getData.content.type);
                  $$('.views-invoices-content-detail .invoices-services ul').html("<li><strong>Dịch vụ:</strong> "+getData.content.services+"</li>"+
                    "<li><strong>Giá trị:</strong> <span>"+getData.content.value_content+" </li>"+
                    "<li><strong>Tặng:</strong> <span>"+getData.content.gift+" "+getData.content.type+"</li>"+
                    "<li><strong>Từ ngày:</strong> "+getData.content.date_from+"</li>"+
                    "<li><strong>Đến ngày:</strong> "+getData.content.date_to+"</li>"+
                    "<li><strong>Khung giờ 1:</strong> "+getData.content.time_from+" - "+getData.content.time_to+"</li>"+
                    "<li><strong>Khung giờ 2:</strong> "+getData.content.time_from_2+" - "+getData.content.time_to_2+"</li>"+
                    "<li><strong>Tuần:</strong> "+getData.content.week+"</li>"+
                    "<li><strong>PT:</strong> "+getData.content.trainer+"</li>");
                  $$('.views-invoices-content-detail .invoices-payment ul').html("<li><strong>Giá tiền:</strong> "+getData.content.price+"</li>"+
                    "<li><strong>Số lượng:</strong> <span>"+getData.content.amount+" </li>"+
                    "<li><strong>Thành tiền:</strong> <span>"+getData.content.total+"</li>"+
                    "<li><strong>Giảm giá 1:</strong> "+getData.content.discount1+"</li>"+
                    "<li><strong>Giảm giá 2:</strong> "+getData.content.discount2+"</li>"+
                    "<li><strong>Giảm trừ:</strong> "+getData.content.minus+"</li>"+
                    "<li><strong>Phụ thu:</strong> "+getData.content.surcharge+"</li>"+
                    "<li><strong>Thanh toán:</strong> "+getData.content.payment+"</li>"+
                    "<li><strong>Đã trả:</strong> "+getData.content.prepay+"</li>"+
                    "<li><strong>Còn nợ:</strong> "+getData.content.conno+"</li>"+
                    "<li><strong>Trạng thái:</strong> "+getData.content.status+"</li>"+
                    "<li><strong>Hình thức:</strong> "+getData.content.from+"</li>"+
                    "<li><strong>Ngày:</strong> "+getData.content.date+"</li>"+
                    "<li><strong>Số phiếu:</strong> "+getData.content.ballot+"</li>");
                  array = getData.prepays;
                  Object.keys(array).forEach(function(key){
                    $$('.invoices-prepay').append("<div class='views-invoices-content-detail margin-top'><div class='list simple-list'><ul><li><strong>Hình thức:</strong> "+array[key].type+"</li>"+
                      "<li><strong>Số tiền:</strong> "+array[key].price+"</li>"+
                      "<li><strong>Ngày:</strong> "+array[key].date+"</li>"+
                      "<li><strong>Nhân viên:</strong> "+array[key].user+"</li></ul></div></div>");
                  });
                }
              },
              function(xhr,status){
                app.dialog.alert('Lỗi không thể kết nối mạng');
              }
          );
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/about/',
      url: 'about.html',
      options: {
        transition: '',
      },
    },
    {
      path: '/user/',
      url: 'user.html',
      on: {
        pageInit: function () {
          app.request.post(
            apiurl+'user/',{'qrcode':localStorage.qrcode,'token':localStorage.token},
            function (data) {
              var getData = JSON.parse(data);
              if(getData.status=='error'){
                app.dialog.alert(getData.content);
              }
              if(getData.status=='success'){
                // $$('.accounts .accounts-images').css("background-image",'url(https://gym.mansys.vn/images/customers/thumb/'+getData.content.images+')');
                $$('.accounts input[name="name"]').val(getData.content.name);
                $$('.accounts input[name="nickname"]').val(getData.content.nickname);
                $$('.accounts input[name="phone"]').val(getData.content.phone);
                $$('.accounts input[name="address"]').val(getData.content.address);
                $$('.accounts input[name="email"]').val(getData.content.email);
                $$('.accounts input[name="birthday"]').val(getData.content.birthday);
              }
            },
            function(xhr,status){
              app.dialog.alert('Lỗi không thể kết nối mạng');
            }
          );
          $$('.update-user').on('submit',function (e){
              app.preloader.show();
              var formData = new FormData($$(this)[0]);
                  formData.append('qrcode',localStorage.qrcode);
                  formData.append('token',localStorage.token);
              app.request.post(apiurl+'update-user',formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    app.dialog.alert(getData.content);
                    localStorage.customers = getData.customers;
                  }
                },
                function(xhr,status){
                  app.preloader.hide();
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          }); 
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/change-pass/',
      url: 'changepass.html',
      on: {
        pageInit: function () {
          $$('.change-pass').on('submit',function (e){
              app.preloader.show();
              var formData = new FormData($$(this)[0]);
                  formData.append('qrcode',localStorage.qrcode);
                  formData.append('token',localStorage.token);
              app.request.post(apiurl+'change-pass',formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                    $$('.change-pass input').val('');
                  }
                  if(getData.status=='success'){
                    app.dialog.alert(getData.content);
                    $$('.change-pass input').val('');
                    mainView.router.navigate('/user/', {reloadAll: true});
                  }
                },
                function(xhr,status){
                  app.preloader.hide();
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                }
              );
          }); 
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/products/',
      url: 'products.html',
      on: {
        pageInit: function () {
          app.request.post(
              apiurl+'products',{'qrcode':localStorage.qrcode,'token':localStorage.token,'type':'new'},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.swiper-products-new .swiper-wrapper').append('<div class="swiper-slide">'+
                      '<div class="card card-products">'+
                        '<div class="card-header"><a class="link item-link item-content" href="/views-products/'+array[key].id+'/"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" class="images"></a></div>'+
                        '<div class="card-content card-content-padding">'+
                          '<strong class="price">'+array[key].price_number+'</strong>'+
                          '<strong class="name">'+array[key].name+'</strong>'+
                        '</div>'+
                        '</div>');
                  });
                  var swiper = app.swiper.create('.swiper-products-new .swiper-container', {
                      slidesPerView: '2',
                      spaceBetween: 10,
                      // centeredSlides: true,
                      loop: true,
                      autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                      },
                  });
                }
              },
              function(xhr,status){
                if(status==200){
                  app.dialog.alert(status);
                }
              }
            );
            app.request.post(
              apiurl+'products',{'qrcode':localStorage.qrcode,'token':localStorage.token,'type':'top'},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.swiper-products-top .swiper-wrapper').append('<div class="swiper-slide">'+
                      '<div class="card card-products">'+
                        '<div class="card-header"><a class="link item-link item-content" href="/views-products/'+array[key].id+'/"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" class="images"></a></div>'+
                        '<div class="card-content card-content-padding">'+
                          '<strong class="price">'+array[key].price_number+'</strong>'+
                          '<strong class="name">'+array[key].name+'</strong>'+
                        '</div>'+
                        '</div>');
                  });
                  var swiper = app.swiper.create('.swiper-products-top .swiper-container', {
                      slidesPerView: '2',
                      spaceBetween: 10,
                      // centeredSlides: true,
                      loop: true,
                      autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                      },
                  });
                }
              },
              function(xhr,status){
                if(status==200){
                  app.dialog.alert(status);
                }
              }
            );
            app.request.post(
              apiurl+'categorys',{'qrcode':localStorage.qrcode,'token':localStorage.token,},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.products-categorys').append('<div class="col-50 card card-categorys">'+
                        '<a class="link item-link item-content" href="/views-categorys/'+array[key].id+'/"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" class="images"></a>'+
                        '<div class="card-content">'+
                          '<strong class="name">'+array[key].name+'</strong>'+
                        '</div>');
                  });
                }
              },
              function(xhr,status){
                if(status==200){
                  app.dialog.alert(status);
                }
              }
            );
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/views-categorys/:categorysId/',
      url: 'views-categorys.html',
      on: {
        pageInit: function (e,page) {
         app.request.post(
               apiurl+'views-categorys/'+page.route.params.categorysId,{'qrcode':localStorage.qrcode,'token':localStorage.token},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  $$('.categorys-title').text(getData.categorys);
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                      $$('.page-content.products .category-list-products').append('<div class="col-50 card card-products">'+
                        '<div class="card-header"><a class="link item-link item-content" href="/views-products/'+array[key].id+'/"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" class="images"></a></div>'+
                        '<div class="card-content card-content-padding">'+
                          '<strong class="price">'+array[key].price_number+'</strong>'+
                          '<strong class="name">'+array[key].name+'</strong>'+
                        '</div>');
                  });
                }
              },
              function(xhr,status){
                app.dialog.alert('Lỗi không thể kết nối mạng');
              }
          );
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/views-products/:productsId/',
      url: 'views-products.html',
      on: {
        pageInit: function (e,page) {
         app.request.post(
               apiurl+'views-products/'+page.route.params.productsId,{'qrcode':localStorage.qrcode,'token':localStorage.token},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  $$('.products-title').text(getData.content.name);
                  $$('.products-price').text(getData.content.price);
                  $$('.products-content').text(getData.content.content);
                  $$('.products-bg').css('background-image', 'url("' +getData.content.images+ '")');
                }
              },
              function(xhr,status){
                app.dialog.alert('Lỗi không thể kết nối mạng');
              }
          );
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/historys/',
      url: 'historys.html',
      on: {
        pageInit: function () {
          app.request.post(
            apiurl+'historys',{'qrcode':localStorage.qrcode,'token':localStorage.token},
            function (data) {
              var getData = JSON.parse(data);
              if(getData.status=='error'){
                app.dialog.alert(getData.content);
              }
              if(getData.status=='success'){
                array = getData.content;
                Object.keys(array).forEach(function(key){
                    $$('.page-content.invoices .list .item-invoices').append('<li class="link item-link item-content">'+
                    '<div class="item-inner">'+
                      '<div class="item-title-row">'+
                        '<div class="item-title">'+
                          '<div class="item-text-title">#'+array[key].invoices+' - '+array[key].services+'</div>'+
                          '<div class="item-text"><i class="f7-icons">calendar</i> '+array[key].date+'</div>'+
                          '<div class="item-text"><i class="f7-icons">number_square</i> '+array[key].code+'</div>'+
                          '<div class="item-text"><i class="f7-icons">person_alt</i> '+array[key].trainers+'</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '</li>');
                });
              }
            },
            function(xhr,status){
              app.dialog.alert('Lỗi không thể kết nối mạng');
              $$('.page-content').html('<div class="error-disconnect"><i class="f7-icons">wifi_exclamationmark</i></div>');
            }
          );
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/calendar/',
      url: 'calendar.html',
      on: {
        pageInit: function () {
         
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/views-calendar/:calendarId/',
      url: 'views-calendar.html',
      on: {
        pageInit: function (e,page) {
          var day;
          var getday = page.route.params.calendarId;
          if(getday==1){
            day = "Thứ 2";
          }
          else if(getday==2){
            day = "Thứ 3";
          }
          else if(getday==3){
            day = "Thứ 4";
          }
          else if(getday==4){
            day = "Thứ 5";
          }
          else if(getday==5){
            day = "Thứ 6";
          }
          else if(getday==6){
            day = "Thứ 7";
          }
          else if(getday==7){
            day = "Chủ nhật";
          }
          $$('.calendar-title-nav').html(day);
          // console.log(getday);
          app.request.post(
            apiurl+'schedule',{'qrcode':localStorage.qrcode,'token':localStorage.token},
            function (data) {
              var getData = JSON.parse(data);
              if(getData.status=='error'){
                app.dialog.alert(getData.content);
              }
              if(getData.status=='success'){
                array = getData.content;
                getSchedule(getData.schedule);
                Object.keys(array).forEach(function(key){
                    $$('.select-schedule').append('<option value="'+array[key].id+'" '+array[key].selected+'>'+array[key].name+' ('+array[key].date_from+' - '+array[key].date_to+')</option>');
                });
                $$('.select-schedule').on("change",function(){
                  var value = $$(this).val();
                  getSchedule(value);
                });
              }
            },
            function(xhr,status){
              app.dialog.alert('Lỗi không thể kết nối mạng');
              $$('.page-content').html('<div class="error-disconnect"><i class="f7-icons">wifi_exclamationmark</i></div>');
            }
          );
          function getSchedule(value){
            $$('.schedule-items').html("");
            app.request.post(
                 apiurl+'schedule-items/'+page.route.params.calendarId+'/'+value+'/',{'qrcode':localStorage.qrcode,'token':localStorage.token},
                function (data) {
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                     var array = getData.times;
                     var schedule = getData.schedule_item;
                     var html = {};
                    Object.keys(array).forEach(function(key){
                      $$('.schedule-items').addClass("schedule-items-"+key);
                      items = schedule[key];
                      html[key] = '';
                      Object.keys(schedule[key]).forEach(function(i){
                        html[key] += '<div class="card" style="background:'+items[i].color+';color:'+items[i].text+'"><div class="card-header card-content-padding"><strong>'+items[i].class+'</strong></div><div class="card-content card-content-padding"><strong>'+items[i].room_class+'<br>'+items[i].personnels+'</strong></div></div>';
                      });
                      $$('.schedule-items').append('<div class="timeline-item">'+
                        '<div class="timeline-item-date">'+array[key].time_from+' - '+array[key].time_to+'</div>'+
                        '<div class="timeline-item-divider"></div>'+
                        '<div class="timeline-item-content">'+html[key]+'</div>'+
                      '</div>');
                    });
                  }
                },
                function(xhr,status){
                  app.dialog.alert('Lỗi không thể kết nối mạng');
                  $$('.page-content').html('<div class="error-disconnect"><i class="f7-icons">wifi_exclamationmark</i></div>');
                }
            );
          }
        },
      },
      options: {
        transition: '',
      },
    },
  ],
  on: {
    // each object key means same name event handler
    pageInit: function (page) {
      if (localStorage.getItem("token")==null || localStorage.getItem("token")=='') {
        localStorage.removeItem("qrcode");
        localStorage.removeItem("companies_id");
        localStorage.removeItem("companies_name");
        localStorage.removeItem("companies_logo");
        localStorage.removeItem("companies_address");
        localStorage.removeItem("branch_id");
        localStorage.removeItem("branch_name");
        localStorage.removeItem("branch_address");
        localStorage.removeItem("images");
        app.views.main.router.navigate('/', {reloadCurrent:true,clearPreviousHistory: true});
      }
      else {
        app.views.main.router.navigate('/home/', {reloadCurrent:true,clearPreviousHistory: true});
        if(localStorage.getItem("companies_id")===null && localStorage.getItem("branch_id")===null){
          getcompanies();
        }
        $$('.ms-logout').on("click",function(){
          localStorage.clear();
          app.views.main.router.navigate('/', {reloadAll: true});
        });
        var $ptrContent = $$('.ptr-content');
        // Add 'refresh' listener on it
        $ptrContent.on('ptr:refresh', function (e) {
          setTimeout(function () {
            app.views.main.router.refreshPage();
          }, 300);
        });
        $$('.ms-accounts-customers').text(localStorage.customers);
        $$('.ms-accounts-phone').text(localStorage.phone);
        $$('.ms-accounts-companies').text(localStorage.companies_name);
        $$('.ms-accounts-images').css({'background':'url('+siteurl+'/images/customers/thumb/'+localStorage.images+')'});
        if(localStorage.getItem("companies_id")!==null && localStorage.getItem("qrcode")!==null){
          app.request.post(
               apiurl+'logo/',{'qrcode':localStorage.qrcode,'token':localStorage.token},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                  $$('.ms-nav .logo').attr('src',localStorage.companies_logo);
                }
                if(getData.status=='success'){
                  localStorage.companies_logo = getData.content;
                }
              },
              function(xhr,status){
                 $$('.ms-nav .logo').attr('src','./img/logo-white.png');
              }
          );
          $$('.ms-nav .logo').attr('src',localStorage.companies_logo);
        }
        else {
          $$('.ms-nav .logo').attr('src','./img/logo-white.png');
        }
      }
    },
  },
});
var mainView = app.views.create('.view-main');
function getcompanies() {
    app.preloader.show();
    var dynamicSheet = app.sheet.create({
      content: '<div class="sheet-modal">'+
        '<div class="toolbar">'+
          '<div class="toolbar-inner">'+
            '<div class="left">CHỌN PHÒNG GYM</div>'+
            '<div class="right">'+
              '<a class="link sheet-close"> <i class="f7-icons">xmark</i></a>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="sheet-modal-inner ms-companies">'+
          '<div class="page-content">'+
              '<ul>'+
              '</ul>'+
          '</div>'+
        '</div>'+
      '</div>',
      swipeToClose: true,
      backdrop: true,
    });
    $$('.sheet-modal .ms-companies ul').html('');
    app.request.post(apiurl+'companies',{'token':localStorage.token},
      function (data) {
        var getData = JSON.parse(data);
        if(getData.status=='error'){
          app.preloader.hide();
          app.dialog.alert(getData.content);
        }
        if(getData.status=='success'){
          app.preloader.hide();
          dynamicSheet.open();
          array = getData.content;
          Object.keys(array).forEach(function(key){
            var companies_name = array[key].companies_name;
            var companies_logo = array[key].companies_logo;
            var companies_id = array[key].companies_id;
            var companies_address = array[key].companies_address;
            var branch_name = array[key].branch_name;
            var branch_id = array[key].branch_id;
            var branch_address = array[key].branch_address;
            var qrcode = array[key].qrcode;
            $$('.sheet-modal .ms-companies ul').append('<li>'+
              '<a class="item-link item-content" data-companies-logo="'+companies_logo+'" data-companies-id="'+companies_id+'" data-companies-name="'+companies_name+'" data-companies-address="'+companies_address+'" data-branch-address="'+branch_address+'" data-branch-id="'+branch_id+'" data-branch-name="'+branch_name+'" data-qrcode="'+qrcode+'" href="#">'+
              '<div class="item-media"></div>'+
              '<div class="item-inner">'+
                '<div class="item-title">'+companies_name+'</div>'+
                '<i class="item-subtitle"><i class="f7-icons">building_2_fill</i> '+branch_name+'</i>'+
                '<i class="item-subtitle"><i class="f7-icons">placemark_fill</i> '+branch_address+'</i>'+
              '</div>'+
              '</a>'+
              '</li>');
          });
          $$('a[data-companies-id]').on('click',function(){
              localStorage.companies_id = $$(this).attr("data-companies-id");
              localStorage.companies_name = $$(this).attr("data-companies-name");
              localStorage.companies_logo = $$(this).attr("data-companies-logo");
              localStorage.companies_address = $$(this).attr("data-companies-address");
              localStorage.branch_id = $$(this).attr("data-branch-id");
              localStorage.branch_name = $$(this).attr("data-branch-name");
              localStorage.branch_address = $$(this).attr("data-branch-address");
              localStorage.qrcode = $$(this).attr("data-qrcode");
              app.views.main.router.refreshPage();
              dynamicSheet.close();
          });
        }
      },
      function(xhr,status){
        app.preloader.hide();
        app.dialog.alert('Lỗi không thể kết nối mạng');
      }
    );
}