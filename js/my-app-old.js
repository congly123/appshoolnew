var apiurl = 'https://gym.mansys.vn/api/dbMMXw8UvFyL3AaWUTLwFDuzlZpBsJLw/';
var pass = 'Kn9yJ7i5DHHx7HkSrWeXpzmAoC2HcD4N';  
var $$ = Dom7;
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'MANSYS GYM',
  // App id
  id: 'com.mansys.gym',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  touch: {
    // Enable fast clicks
    fastClicks: true,
    tapHold: true,
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
      on: {
        pageInit: function () {
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
                  formData.append('pass',pass);
                  formData.append('comfirm-phone','');
              app.request.post(
                apiurl,
                formData, 
                function (data) {
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    localStorage.customers = getData.customers;
                    localStorage.id = getData.id;
                    if(localStorage.id){
                      if(getData.content=="phonecode"){
                          mainView.router.navigate('/phonecode/', {transition: ''});
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
      path: '/phonecode/',
      url: 'phonecode.html',
      on: {
        pageInit: function () {
          $$('.form-code',).on('submit',function (e){
            app.preloader.show();
            var formData = new FormData($$(this)[0]);
                formData.append('pass',pass);
                formData.append('id',localStorage.id);
                formData.append('phone-code','');
            app.request.post(
              apiurl,
              formData, 
              function (data) {
                app.preloader.hide();
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  localStorage.customers = getData.customers;
                  localStorage.id = getData.id;
                  if(localStorage.id){
                    if(getData.content=="register"){
                        mainView.router.navigate('/register/', {transition: ''});
                    }
                    if(getData.content=="login"){
                        mainView.router.navigate("/login/", {transition: ''});
                    }
                  }
                }
              },
              function(xhr,status){
                app.preloader.hide();
                app.dialog.alert('Lỗi không thể kết nối mạng');
              }
            );
          });
          $$('.send-code-comfirm').on('click',function (e){
              app.preloader.show();
              var formData = new FormData();
                  formData.append('pass',pass);
                  formData.append('id',localStorage.id);
                  formData.append('send-code','');
              app.request.post(
                apiurl,
                formData, 
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
                  formData.append('pass',pass);
                  formData.append('id',localStorage.id);
                  formData.append('register','');
              app.request.post(
                apiurl,
                formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    localStorage.token = getData.token;
                    localStorage.identify = getData.identify;
                    if(localStorage.token!='' && localStorage.identify!=''){
                        localStorage.id = getData.id;
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
      path: '/login/',
      url: 'login.html',
      on: {
        pageInit: function () {
          $$('.form-login').on('submit',function (e){
              app.preloader.show();
              var formData = new FormData($$(this)[0]);
                  formData.append('pass',pass);
                  formData.append('id',localStorage.id);
                  formData.append('login','');
              app.request.post(
                apiurl,
                formData, 
                function (data) {
                  app.preloader.hide();
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    localStorage.token = getData.token;
                    localStorage.identify = getData.identify;
                    if(getData.token!=='' && getData.identify!==''){
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
          if(localStorage.getItem("companies")!==null && localStorage.getItem("qrcode")!==null){
            $$('.ms-infomation-home .infomation').html(localStorage.customers);
            $$('.ms-infomation-home .company').html(localStorage.name);
            app.request.post(
              apiurl,
              {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'advertisement':''},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.ms-advertisement-home .swiper-wrapper').append('<div class="swiper-slide"><img style="width:100%;border:1px solid #f1f1f1" src="https://gym.mansys.vn/images/advertisement/'+array[key].images+'"></div>');
                  });
                }
              },
              function(xhr,status){
                app.dialog.alert('Lỗi không thể kết nối mạng');
              }
            );
            app.request.post(
              apiurl,
              {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'products-new':''},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.ms-products-new-list .swiper-wrapper').append('<div class="swiper-slide">'+
                      '<div class="card card-products">'+
                        '<div class="card-header"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" class="images"></div>'+
                        '<div class="card-content card-content-padding">'+
                          '<strong class="price">'+array[key].price_number+'</strong>'+
                          '<strong class="name">'+array[key].name+'</strong>'+
                          '<p class="content">'+array[key].content+'</p>'+
                        '</div>'+
                        '<!-- <div class="card-footer"><a href="#" class="col button button-small color-red"><i class="f7-icons">cart_badge_plus</i> ĐẶT NGAY</a><a href="#" class="col button button-small"><i class="f7-icons">eye_fill</i> XEM</a></div> -->'+
                      '</div>'+
                      '</div>');
                  });
                }
              },
            );
            app.request.post(
              apiurl,
              {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'products-top':''},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.ms-products-top-list ul').append('<li>'+
                        '<a href="#" class="item-link item-content">'+
                        '<div class="item-media"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" width="44"/></div>'+
                        '<div class="item-inner">'+
                          '<div class="item-title-row">'+
                            '<div class="item-title">'+array[key].name+'</div>'+
                          '</div>'+
                          '<div class="item-subtitle">'+array[key].price_number+'</div>'+
                          '<div class="item-text">'+array[key].content+'</div>'+
                        '</div>'+
                        '</a>'+
                     ' </li>');
                  });
                }
              },
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
            background: "#f1f7ff",
            foreground: "#000000",
            text:localStorage.qrcode,
          });
          $('.name-companies').text(localStorage.name);
          $('.name-customers').text(localStorage.customers);
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
      path: '/historys/',
      url: 'historys.html',
      on: {
        pageInit: function () {
          app.request.post(
            apiurl,
            {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'history':''},
            function (data) {
              var getData = JSON.parse(data);
              if(getData.status=='error'){
                app.dialog.alert(getData.content);
              }
              if(getData.status=='success'){
                array = getData.content;
                Object.keys(array).forEach(function(key){
                  $$('.historys .list ul').append('<li>'+
                  '<a class="item-link item-content" href="#">'+
                  '<div class="item-inner">'+
                    '<div class="item-title-row">'+
                      '<div class="item-title">#'+array[key].services+'</div>'+
                      '<div class="item-after">'+array[key].date+' '+array[key].time+'</div>'+
                    '</div>'+
                    '<div class="item-subtitle">Huấn luyện viên: '+(array[key].trainer==null?'':array[key].trainer)+'</div>' +
                  '</div>'+
                  '</a>'+
                  '</li>');
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
      path: '/invoices/',
      url: 'invoices.html',
      on: {
        pageInit: function () {
          app.request.post(
            apiurl,
            {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'invoices':''},
            function (data) {
              var getData = JSON.parse(data);
              if(getData.status=='error'){
                app.dialog.alert(getData.content);
              }
              if(getData.status=='success'){
                array = getData.content;
                Object.keys(array).forEach(function(key){
                  $$('.page-content.invoices .list .item-invoices').append('<li>'+
                  '<a class="item-link item-content popup-open" href="#" data-popup=".popup-'+array[key].code+'">'+
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
      path: '/user/',
      url: 'user.html',
      on: {
        pageInit: function () {
          app.request.post(
            apiurl,
            {'pass':pass,'id':localStorage.id,'user':''},
            function (data) {
              var getData = JSON.parse(data);
              if(getData.status=='error'){
                app.dialog.alert(getData.content);
              }
              if(getData.status=='success'){
                $$('.accounts .accounts-images').css("background-image",'url(https://gym.mansys.vn/images/customers/thumb/'+getData.content.images+')');
                $$('.accounts .name').text(getData.content.name);
                $$('.accounts .nickname').text(getData.content.nickname);
                $$('.accounts .phone').text(getData.content.phone);
                $$('.accounts .address').text(getData.content.address);
                $$('.accounts .email').text(getData.content.email);
                $$('.accounts .birthday').text(getData.content.birthday);
                $$('.accounts .company').text(localStorage.name);
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
      path: '/changepass/',
      url: 'changepass.html',
      on: {
        pageInit: function () {
          $$('.form-changepass').on('submit',function (e){
              var formData = new FormData($$(this)[0]);
                  formData.append('pass',pass);
                  formData.append('id',localStorage.id);
                  formData.append('changepass','');
              app.request.post(
                apiurl,
                formData, 
                function (data) {
                  var getData = JSON.parse(data);
                  if(getData.status=='error'){
                    app.dialog.alert(getData.content);
                  }
                  if(getData.status=='success'){
                    app.dialog.alert('Thay đổi thành công');
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
      path: '/products/',
      url: 'products.html',
      on: {
        pageInit: function () {
          app.request.post(
              apiurl,
              {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'categorys':''},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.categorys .row').append('<div class="col-33">'+
                      '<a href="/categorys/'+array[key].id+'/" class="link item">'+
                          '<div class="thumb"><img src="'+array[key].url_images+array[key].images+'"></div>'+
                          '<div class="name">'+array[key].name+'</div>'+
                      '</a>'+
                    '</div>');
                  });
                  $$('.categorys .item').on("click",function(){
                    mainView.router.navigate($$(this).attr("href"),{transition: ''});
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
      path: '/pt/',
      url: 'pt.html',
      on: {
        pageInit: function () {
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/news/',
      url: 'news.html',
      on: {
        pageInit: function () {
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/about/',
      url: 'about.html',
      on: {
        pageInit: function () {
        },
      },
      options: {
        transition: '',
      },
    },
    {
      path: '/categorys/:categorysId/',
      url: 'categorys.html',
      on: {
        pageInit: function (e,page) {
          app.request.post(
              apiurl,
              {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'category':page.route.params.categorysId,'categorys-products':''},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  $$('.ms-name-categorys').text(getData.category);
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.category-products .ms-products-list ul').append('<li>'+
                        '<a href="#" class="item-link item-content">'+
                        '<div class="item-media"><img src="'+array[key].url_images+'thumb/'+array[key].images+'" width="44"/></div>'+
                        '<div class="item-inner">'+
                          '<div class="item-title-row">'+
                            '<div class="item-title">'+array[key].name+'</div>'+
                          '</div>'+
                          '<div class="item-subtitle">'+array[key].price_number+'</div>'+
                          '<div class="item-text">'+array[key].content+'</div>'+
                        '</div>'+
                        '</a>'+
                     ' </li>');
                  });
                  $$('.categorys .item').on("click",function(){
                    mainView.router.navigate($$(this).attr("href"),{transition: ''});
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
      path: '/calendar/',
      url: 'calendar.html',
      on: {
        pageInit: function () {
          app.request.post(
              apiurl,
              {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'schedule':''},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  getSchedule(getData.schedule);
                  Object.keys(array).forEach(function(key){
                    $$('.ms-calendar .select-schedule').append('<option value="'+array[key].id+'" '+array[key].selected+'>'+array[key].name+' ('+array[key].date_from+' - '+array[key].date_to+')</option>');
                  });
                  $$('.select-schedule').on("change",function(){
                    var value = $$(this).val();
                    getSchedule(value);
                  });
                }
              },
              function(xhr,status){
                app.dialog.alert('Lỗi không thể kết nối mạng');
              }
          );
          function getSchedule(value){
            $$('.ms-calendar .accordion-list.className .className-Items').html('');
            app.request.post(
              apiurl,
              {'pass':pass,'id':localStorage.id,'qrcode':localStorage.qrcode,'getschedule':value,'schedule-item':''},
              function (data) {
                var getData = JSON.parse(data);
                if(getData.status=='error'){
                  app.dialog.alert(getData.content);
                }
                if(getData.status=='success'){
                  array = getData.content;
                  Object.keys(array).forEach(function(key){
                    $$('.ms-calendar .accordion-list.className .className-Items').append('<li class="accordion-item">'+
                        '<a href="#" class="item-content item-link">'+
                          '<div class="item-inner">'+
                            '<div class="item-title">'+key+'</div>'+
                          '</div>'+
                        '</a>'+
                        '<div class="accordion-item-content">'+
                          '<div class="block">'+
                            '<div class="list accordion-list ClassTimes">'+
                              '<div class="data-table">'+array[key]+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</li>');
                  });
                }
              },
              function(xhr,status){
                app.dialog.alert('Lỗi không thể kết nối mạng');
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
      if (localStorage.getItem("token")==null && localStorage.getItem("identify")==null || localStorage.getItem("token")=='' && localStorage.getItem("identify")=='') {
        app.views.main.router.navigate('/', {reloadAll: true});
      }
      else {
        app.views.main.router.navigate('/home/', {reloadCurrent:true,clearPreviousHistory: true});
        if(localStorage.getItem("companies")===null && localStorage.getItem("qrcode")===null){
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
          }, 1000);
        });
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
    app.request.post(
      apiurl,
      {'pass':pass,'id':localStorage.id,'companies':''},
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
            var name = array[key].name;
            var companies = array[key].id;
            var code = array[key].qrcode;
            $$('.sheet-modal .ms-companies ul').append('<li>'+
              '<a class="item-link item-content" data-companies="'+companies+'" data-name="'+name+'" data-code="'+code+'" href="#">'+
              '<div class="item-media"></div>'+
              '<div class="item-inner">'+
                '<div class="item-title">'+name+'</div>'+
              '</div>'+
              '</a>'+
              '</li>');
          });
          $$('a[data-companies]').on('click',function(){
              localStorage.companies = $$(this).attr("data-companies");
              localStorage.qrcode = $$(this).attr("data-code");
              localStorage.name = $$(this).attr("data-name");
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