var myapp = angular.module('myApp',['ui.router','ngStorage']);

myapp.config(function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
       $stateProvider
        .state('/',{
            				      url:'/',
            				      templateUrl:'/static/views/login.html',
            				      controller:'loginController'
		                    })
        .state('overview',{
                          url:'/overview',
                          templateUrl:'/static/views/overview.html',
                          controller:'overviewController'
                        })
        .state('roomapp',{
            				      url:'/roomapp',
            				      templateUrl:'/static/views/roomapp.html',
            				      controller:'roomappController'
		                    })
        .state('register',{
                          url:'/register',
                          templateUrl:'/static/views/admin_register.html',
                          controller:'registerController'
                        })
		    .state('getpwd',{
          		    	      url:'/getpwd',
                          templateUrl : '/static/views/forgotpassword.html',
                          controller  : 'getpwdController'
                        })
        .state('changepwd',{
                          url:'/changepwd',
                          templateUrl : '/static/views/changepassword.html',
                          controller  : 'changepwdController'
                        })
                          .state('infomail', {
                                  url: '/infomail',
                                  parent:'roomapp',
                                  templateUrl: '/static/views/infomail.html',
                                  controller:'infomailController'   
                                  })
                          .state('roomexptable', {
                                  url: '/roomexptable',
                                  parent:'roomapp',
                                  templateUrl: '/static/views/roomexptable.html',
                                  controller:'roomexptableController'   
                                  })
                          .state('rm2', {
                                  url: '/rm2',
                                  parent:'roomapp',
                                  templateUrl: '/static/views/rm2.html',
                                  controller:'rm2Controller'   
                                  })
                          .state('adminpage', {
                                  url: '/adminpage',
                                  parent:'roomapp',
                                  templateUrl: '/static/views/admin_page.html',
                                  controller:'adminController'   
                                  })
                          .state('roomstats', {
                                  url: '/roomstats',
                                  parent:'roomapp',
                                  templateUrl: '/static/views/room_stats.html',
                                  controller:'roomstatsController'   
                                  })
                          .state('members', {
                                  url: '/members',
                                  parent:'roomapp',
                                  templateUrl: '/static/views/room_members.html',
                                  controller:'membersController'   
                                  })
                          .state('edit_my_details', {
                                  url: '/edit_my_details',
                                  parent:'roomapp',
                                  templateUrl: '/static/views/edit_member.html',
                                  controller:'editdetailsController'   
                                  })
                          .state('roominfo', {
                                  url: '/roominfo',
                                  parent:'roomapp',
                                  templateUrl: '/static/views/room_information.html',
                                  controller:'roominfoController'   
                                  });
    });

myapp.controller('loginController',function($scope,$location,$http,$window,$localStorage){

		
		$scope.register=function(){
		  $location.path('/signup');	
		}

		$scope.forgot=function(){
		  $location.path('/getpwd');	
		}

    $scope.change=function(){
      $location.path('/changepwd');  
    }

    $scope.d=function(){
      $http({method:"post",
                url:"/test_d/",
                data:$.param({'id':5}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(resp){
              var href = resp.path;
              window.location.href = href;                     
            }).error(function(resp){
                    
            });
    }

		$scope.login = function(username,password){
	    $scope.successmsg = '';
      $scope.errmsg = '';
	    $http({method:"post",
	              url:"/signin/",
	              data:$.param({'username':username,'password':password}),
	              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	          }).success(function(resp){
              console.log(resp);
              var room_id = resp.room_id;
              var room_name = resp.room_name;
              var room_code = resp.room_code;
              var login_id = resp.login_id;
              var role = resp.role;
              var person_name = resp.person_name;
              var person_email = resp.person_email;
              
              $localStorage['room_id'] = room_id;
              $localStorage['room_name'] = room_name;
              $localStorage['room_code'] = room_code;
              $localStorage['login_id'] = login_id;
              $localStorage['role'] = role;
              $localStorage['person_name'] = person_name;
              $localStorage['person_email'] = person_email;



              
              if (resp.status != 'Username or Password Doesnot Exists!'){
                $scope.successmsg = resp.status;
                  if(role == "admin"){
                    $location.path('/roomapp/adminpage');
                  }
                  else{
                    $location.path('/roomapp/rm2');
                  }
              }
              else{
                $scope.errmsg = resp.status;
                console.log($scope.errmsg);
              }
			            	
			      });
	    }
});

myapp.controller('roomappController',function($scope, $location, $http, $window, $localStorage, $state){
	$scope.obj='';
  $scope.role = $localStorage['role'];
  $scope.person_name = $localStorage['person_name']
  $scope.room_name = $localStorage['room_name'];
  $scope.room_code = $localStorage['room_code'];

  $scope.$state = $state;

		$http.get('/out/').success(function(resp){
	         	$scope.obj = resp.status;
	         	// console.log("from success : ",$scope.obj);
	         	
	         	if ($scope.obj == 'user_id not there'){
	         		
	         		$location.url('/');
	         	}
	         	else{
	         		
	         	}
	         	
	         }); 

    $("#pn").click(function(){
        $("#pn_menu").slideToggle(300);
    });

    $scope.open_menu = true;

    $scope.openNav = function () {
        $("#mySidenav").css({'width': "250px"});
        $scope.open_menu = !$scope.open_menu;
    }

    $scope.closeNav = function () {
        $("#mySidenav").css({'width': "0px"});
        $scope.open_menu = !$scope.open_menu;
    }

	         
	   $scope.signout=function(){

	   	$http.get('/logout/')
	   	    .success(function(resp){
	         	console.log('from signout',resp)
	         	$location.url('/');
	         }).error(function(resp){
	         	
	         });

	   }      	
  
		$scope.mailit=function(mail_id,content,subject){
			$http({method:"post",
	              url:"/sendmail/",
	              data:$.param({'mail_id':mail_id,'content':content,'subject':subject}),
	              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		         }).success(function(resp){
		         	console.log("response for sending mail is",resp);
				 }).error(function(resp){
            console.log("response for error is",resp);
            $scope.errmsg = resp;
       });

		}


});

myapp.controller('getpwdController',function($scope, $location, $http, $window){
	$scope.obj='';
	$scope.gotohome=function(){
		$location.url('/');
	}

	$scope.getuserpassword=function(uname,mail_id){
			 $scope.successmsg = '';
       $scope.errmsg = '';
			 $http({method:"post",
	              url:"/getuserpassword/",
	              data:$.param({'uname':uname,'mail_id':mail_id}),
	              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	         }).success(function(resp){
	         	console.log("response for sending mail is",resp);

            if(resp.status=='Password has been sent to your mail successfully'){
              $scope.successmsg = resp.status;
              $scope.forgot = {};
              $scope.ForgotLoginForm.$setPristine();
            }
            else{
              $scope.errmsg = resp.status;
            }
			 })
			 .error(function(resp){
	         	console.log("response for error is",resp);
	         	$scope.errmsg = resp;
			 });

			}
		 
});

myapp.controller('changepwdController',function($scope, $location,$http,$window){
  $scope.obj='';
  
  $scope.gotohome=function(){
    $location.url('/');
  }

  $scope.changeuserpassword=function(ru){
       $scope.successmsg = '';
       $scope.errmsg = '';
       $http({method:"post",
                url:"/changepassword/",
                data:$.param({'mail_id':ru.user_email,'old_pwd':ru.password,'new_pwd':ru.new_password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           }).success(function(resp){
            console.log("response for sending mail is",resp);
            if(resp.status=='Password has been Updated successfully'){
              $scope.successmsg = resp.status;
              $scope.changepwd_user = {};
              $scope.ChangePwdForm.$setPristine();
            }
            else{
              $scope.errmsg = resp.status;
            }
            
       })
       .error(function(resp){
            console.log("response for error is",resp);
            $scope.errmsg = resp;
       });

      }
     
});
// rm2 controller
myapp.controller('rm2Controller',function($scope,$location,$http,$window,$localStorage){

    var room_id = Number($localStorage['room_id']);
    var room_code = $localStorage['room_code'];
    $scope.person_name = $localStorage['person_name'];
    $scope.person_role = $localStorage['role'];
    $scope.person_email = $localStorage['person_email'];
    $scope.report_div = false;
    $scope.sign_found = true;

    $scope.user = {};
    $scope.users_list = [];
    $scope.take_list = [];
    $scope.take = [];
    $scope.persons_info = [];
    $scope.persons_info1 = [];
    $scope.user.id = -1;


    $http({method:"get",
                url:"/getuser_list/"+room_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              // console.log("users_list",resp);
              if(resp.user_list.length != 0){
                  $scope.users_list = resp.user_list;
              }
              }).error(function(err){
                        console.log("error",err);
    });

    $scope.edit_rec = function(id){
      $http({method:"GET",
                url:"/edit_rec/"+id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
                $scope.take = [];
                $scope.take_list = [];
                $scope.user.item = resp.item_info.fields.item_name;
                $scope.user.id = resp.item_info.pk;
                $scope.user.items = resp.item_info.fields.items_count;
                $scope.user.amt = resp.item_info.fields.item_cost;
                $scope.user.sign = resp.item_info.fields.payee;
                $scope.record_id = resp.item_info.pk;
                $scope.take_list = [];
                $scope.take = [];

                for(var j=0;j<resp.persons_info.length;j++){
                  // $scope.take.push(resp.persons_info[j].username);
                  console.log(resp.persons_info[j],"_=========_");
                  $scope.take_list.push({'id':resp.persons_info[j].persons_id,'name':resp.persons_info[j].username,'val':resp.persons_info[j].amount_to_pay});
                  // {'id':take[i],'name':$scope.users_list[j].fields.person_name,'val':partition,'email':$scope.users_list[j].fields.person_email,'room_id':room_id,'room_code':room_code}
                  $scope.take.push(resp.persons_info[j].persons_id);
                }

             }).error(function(err){
                  console.log("error",err);
        });
    }

    // for select room members in edit
    $scope.select_in_edit = function(id ){
      $.each($scope.take, function(i,e){
        console.log(e,"++++++++++++");
        $("#sel option[value='" + e + "']").prop("selected", true);
      });
    }

    $scope.delete_rec = function(id){
          $http({method:"GET",
                url:"/delete_rec/"+id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("response for sending mail is",resp);
              
         }).error(function(err){
                  console.log("error",err);
        });

        }

    // Woriking
    $scope.parts = function(user,take){
      $scope.take_list.length = 0;
      var selectedMembers=take.length;
      var Amount=parseInt(user.amt);
      var partition=Amount/selectedMembers;
            for(var i=0;i<take.length;i++){
              for(var j=0;j<$scope.users_list.length;j++){
                if(take[i] == $scope.users_list[j].pk){
                  $scope.take_list.push({'id':take[i],'name':$scope.users_list[j].fields.person_name,'val':partition,'email':$scope.users_list[j].fields.person_email,'room_id':room_id,'room_code':room_code});

                }
              }
            }
    }

    function check_amount_distribution(amt){
      $scope.check_val = 0;
       $('.split_div').find('input').each(function(){
        console.log($(this).val());
        $scope.check_val += Number($(this).val());
      });
       if(Math.ceil($scope.check_val) != Number(amt)){
              $scope.check_amt = true;
              return false;
            }
        else{
          $scope.check_amt = false;
          return true;
        }

    }

    $scope.check_amt = false;
    $scope.distribution_change_fun=function(amt){
      check_amount_distribution(amt);
    }

    // return validateQty(event);
    function validateQty(event) {
        var key = window.event ? event.keyCode : event.which;

        if (event.keyCode == 8 || event.keyCode == 46
         || event.keyCode == 37 || event.keyCode == 39) {
            alert(event.keyCode);
            return true;
        }
        else if ( key < 48 || key > 57 ) {
          alert();
            return false;
        }
        else{ 
          return true;
        }
    };

    function check_sign_as_member(sign){
          console.log($scope.users_list,sign);
          $scope.sign_person = false;
          angular.forEach($scope.users_list, function(value, key){
            console.log(value,"ddddd");
            if(value.fields.person_name == sign){
              $scope.sign_person = true;
            }
          });

          return $scope.sign_person;
    }

    $scope.amount_validations = function(amount){
      $scope.take_list = [];
      $scope.take = [];
    }

    var entry_date1 = ''
    $scope.entry_date_now = $('#datetimepicker1').datetimepicker();

    $scope.add_entry = function(user){

      var entry_date1 = $('#dt_picker').val();
      var amt = user.amt;
      check_amount_distribution(amt);

      $scope.sign = user.sign;
      $scope.sign_found = check_sign_as_member($scope.sign);

      if($scope.sign_found == false){
        return false;
      }



      var data = {'desc':user.description,'entry_date':entry_date1,'id':user.id,'item':user.item,'items_count':user.items,'paid_amount':user.amt,'paid_person':user.sign,'person_list':JSON.stringify($scope.take_list),'room_id':room_id}


      $.ajax({url: '/new_entry/',
              type: 'POST',
              data: data, 
              success: function(result){
                console.log(result.status,"success");
                    $scope.data1 = result.a;
                    for(var i=0;i<result.a.length;i++){
                        $scope.persons_info1.push(result.a[i].persons_info);
                    }

                    if(result.status!=''){
                      $scope.successmsg = result.status;
                      $scope.user = {};
                      $scope.take_list = [];
                      $scope.take = [];

                      $scope.dailyEntriesForm.$setPristine();
                      $scope.$apply();
                    }
                    else{
                      $scope.errmsg = result.status;
                    }
              },
              error: function(err){console.log(err,"error");}
            });
    }


    $scope.statics = function(person_name){
     
      var data = {'person_email':$scope.person_email,'room_id':room_id}

      $.ajax({url: '/statics/',
              type: 'POST',
              data: data, 
              success: function(resp){
                console.log(resp,"success");
                $scope.report_div = true;

                $scope.expense = resp.amt_of_expense;
                $scope.spent = resp.amt_spent;
                $scope.report = resp.report;

                $scope.$apply();
              },
              error: function(err){console.log(err,"error");}
            });
    }

    $http({method:"get",
                url:"/total/"+room_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              $scope.data = resp;
              for(var i=0;i<resp.length;i++){
                  $scope.persons_info.push(resp[i].persons_info)
              }
              }).error(function(err){
                        console.log("error",err);
    });

    
     
});


myapp.controller('registerController',function($scope, $location,$http){
  $scope.register = function(reg_user){
  
  $http({method:"post",url:"/adminregister/",data:$.param(reg_user),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(resp){
          console.log(";ll");
          $scope.successmsg = resp.status;
          $scope.reg_user = {};
          $scope.registerForm.$setPristine();

        }).error(function(resp){
          $scope.errmsg = resp.status;
          console.log($scope.errmsg);
        
        });

  }


});

myapp.controller('adminController',function($scope, $location,$http,$window,$localStorage){

  var room_id = $localStorage['room_id'];
  var room_code = $localStorage['room_code'];
  $scope.person_role = $localStorage['role'];
  $scope.report_div = false;
  
  $scope.get_all_users = function(){
      $.ajax({url: '/get_all_users/',
              type: 'GET',
              success: function(result){console.log(result,"success");},
              error: function(err){console.log(err,"error");}
            });
    }

  $scope.statics = function(person_email){
     
      var data = {'person_email':person_email,'room_id':room_id}

      $.ajax({url: '/statics/',
              type: 'POST',
              data: data, 
              success: function(resp){
                console.log(resp,"success");
                $scope.report_div = true;
                $scope.person_email = '';
                $scope.report = resp.report;
                $scope.expense = resp.amt_of_expense;
                $scope.spent = resp.amt_spent;
                $scope.$apply();
                
              },
              error: function(err){console.log(err,"error");}
            });
    }

  $http({method:"get",
                url:"/getuser_list/"+room_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("users_list",resp);
              if(resp.user_list.length != 0){
                  $scope.users_list = resp.user_list;
              }
              }).error(function(err){
                        console.log("error",err);
    });

    $scope.create_user = function(new_user){
        $scope.successmsg = ''
        $scope.errmsg = ''
        $scope.file_data = $("#avatar").prop("files")[0];
        console.log($scope.file_data);
        $scope.jsonData = {  
            'new_user':new_user,
            'room_id':room_id,
            'room_code':room_code
        };

        $http({  
            method: 'POST',  
            url: "/create_user/",  
            headers: { 'Content-Type': undefined },  
             
            transformRequest: function (data) {  
                var formData = new FormData();  
                formData.append("model", angular.toJson(data.model));  
                formData.append("avatar_file", data.files);
                
                return formData;  
            },  
            data: { model: $scope.jsonData, files: $scope.file_data }  
        }).  
        success(function (data, status, headers, config) { 
            console.log(data,"ooooooooo"); 
            $scope.files = [];

            if(data.status =='New user added successfully to Room'){
                      $scope.successmsg = data.status;
                      $scope.rm_member = {};
                      $scope.adminEntryForm.$setPristine();
                      $scope.$apply();
                    }
                    else{
                      $scope.errmsg = data.status;
                    }
        }).  
        error(function (data, status, headers, config) {  
          console.log(data,"oooooooo");
        });  

    } 

    $scope.remove_user = function(id){
      var confirm_val = confirm("Do you want to remove?");

      if (confirm_val == true){
        $http({method:"post",
                url:"/remove_user/",
                data:$.param({'id':id}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("response for sending mail is",resp);
              $scope.mail_success = resp.status;
            }).error(function(err){
                  console.log("error",err);
        });
      }
    }
  
});

myapp.controller('membersController',function($scope, $location, $http, $localStorage){

  var room_id = $localStorage['room_id'];
  $scope.login_id = $localStorage['login_id'];

  $scope.dload = function(){
    $http({method:"get",
                url:"/dload/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("users_list",resp.dload);
              location.replace(resp.dload);
              
              }).error(function(err){
                        console.log("error",err);
    });

  }
  $http({method:"get",
                url:"/getuser_list/"+room_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("users_list",resp);
              if(resp.user_list.length != 0){
                  $scope.users_list = resp.user_list;
                  console.log($scope.users_list,"jjjjjjjjjj");
              }
              }).error(function(err){
                        console.log("error",err);
    });

  $scope.edit_member_details = function(id){
      $location.url('/roomapp/edit_my_details');
  }
  
  
});

myapp.controller('editdetailsController',function($scope, $location, $http, $localStorage){
  var room_id = $localStorage['room_id'];
  var member_id = $localStorage['login_id'];
  var room_code = $localStorage['room_code']


  $http({method:"get",
                url:"/edit_roommember/"+member_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("users_list",resp);
              $scope.rm_member={};
              $scope.rm_member['user_name'] = resp.member.fields.person_name;
              $scope.rm_member['user_email'] = resp.member.fields.person_email;
              $scope.rm_member['mobile_number'] = resp.member.fields.person_mobile;
              $scope.rm_member['user_role'] = resp.member.fields.person_role;
              $scope.rm_member['designation'] = resp.member.fields.person_designation;
              $scope.rm_member['description'] = resp.member.fields.person_description;
              $scope.rm_member['zipcode'] = resp.member.fields.person_zipcode;
              $scope.rm_member['address'] = resp.member.fields.person_address;
              }).error(function(err){
                        console.log("error",err);
    });

    $scope.update_user = function(update_user){

        $scope.file_data = $("#avatar_update").prop("files")[0];
        $scope.jsonData = {  
            'update_user':update_user,
            'room_id':room_id,
            'room_code':room_code
        };

        $http({  
            method: 'POST',  
            url: "/update_user/"+member_id+"/",  
            headers: { 'Content-Type': undefined },  
             
            transformRequest: function (data) {  
                var formData = new FormData();  
                formData.append("model", angular.toJson(data.model));  
                formData.append("avatar_file", data.files);
                
                return formData;  
            },  
            data: { model: $scope.jsonData, files: $scope.file_data }  
        }).  
        success(function (data, status, headers, config) { 
            console.log(data,"ooooooooo"); 
            $scope.files = [];
            alert("Your Information Updated Successfully");
            $location.url('/roomapp/members');
        }).  
        error(function (data, status, headers, config) {  
          console.log(data,"oooooooo");
        }); 

    } 
  
  
});

myapp.controller('infomailController',function($scope,$location,$http,$window,$localStorage){
    $scope.successmsg = ''
    $scope.errmsg = ''
    var room_id = Number($localStorage['room_id']);
    var room_code = $localStorage['room_code'];
    $scope.person_name = $localStorage['person_name'];
    $scope.person_role = $localStorage['role'];
    $scope.person_email = $localStorage['person_email'];

    $scope.infomail = function(user_email, subject, description){
              $scope.successmsg = ''
              $scope.errmsg = ''
              $http({method:"post",
                          url:"/infomail/",
                          data:$.param({'mail_id':user_email,'subject':subject,'desc':description}),
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                     }).success(function(resp){
                      console.log("response for sending mail is",resp);
                      if(resp.status="success"){
                        $scope.successmsg = resp.msg;
                        $scope.infomail = {};
                        $scope.infoMailForm.$setPristine();
                      }
                      else{
                        $scope.errmsg = resp.msg;
                      }
                 })
                 .error(function(resp){
                      console.log("response for error is",resp);
                      $scope.errmsg = resp;
                 });
    }

    $scope.sql_file = function(){
      $http({method:"GET",
                url:"/sql_file/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("666666666666666666666666667",resp);
              
         }).error(function(err){
                  console.log("error",err);
        });

    }

    $scope.mail_excel = function(user_email, subject, description){
      var user_email = 's1thcreator.choda@gmail.com';
      var subject = 'Excel_file Back_up upto date'
      var description = 'sssssssss'
      $http({method:"post",
                    url:"/mail_excel/",
                    data:$.param({'mail_id':user_email,'subject':subject,'desc':description}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   }).success(function(resp){
                    console.log("response for sending mail is",resp);
                    $scope.msg = resp;
                 })
                 .error(function(resp){
                      console.log("response for error is",resp);
                      $scope.errmsg = resp;
                 });

    }

});

myapp.controller('roominfoController',function($scope,$location,$http,$window,$localStorage){
    $scope.successmsg = ''
    $scope.errmsg = ''
    var room_id = Number($localStorage['room_id']);
    var room_code = $localStorage['room_code'];
    $scope.person_name = $localStorage['person_name'];
    $scope.person_role = $localStorage['role'];
    $scope.person_email = $localStorage['person_email'];
    $scope.rm_info_div = false;
    $scope.file_val = true;

    
    if($scope.person_role == 'admin'){
      $scope.rm_info_div = true;
    }
    else{
      $scope.rm_info_div = false;
    }

    $http({method:"GET",
                url:"/get_roominfo/"+room_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
                                        $scope.data = resp.rm_info;
                                        $scope.imageid = 0;
                                        $scope.images = resp.rm_imgs;
              
              }).error(function(err){
                                      console.log("error",err);
              });

    $scope.avail = function(available){
      if(available == 'yes'){
        $scope.rm_info.bill = undefined;
      }
      if(available == 'no'){
        $scope.rm_info.bill = 0;
      }
    }

    $http({method:"GET",
                url:"/roomoverviewinfo/"+room_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
                                        $scope.city = resp.rm_ovinfo.fields.room_city;
                                        $scope.address = resp.rm_ovinfo.fields.room_address;
                                        $scope.zipcode = resp.rm_ovinfo.fields.room_zipcode;
                                        $scope.description = resp.rm_ovinfo.fields.room_description;
              
              }).error(function(err){
                                      console.log("error",err);
              });


    $scope.room_overviewinfo = function(room_ovinfo){
      data = {'city':room_ovinfo.room_city,'zipcode':room_ovinfo.room_zipcode,'address':room_ovinfo.room_address
      ,'desc':room_ovinfo.room_desc,'room_id':room_id};

        $scope.successmsg = ''
        $scope.errmsg = ''
        $http({method:"post",
                    url:"/roomoverviewinfo/"+room_id+"/",
                    data:$.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   }).success(function(resp){
                    console.log("response for sending mail is",resp);
                    if(resp.status="success"){
                        $scope.city = resp.rm_ovinfo.fields.room_city;
                        $scope.address = resp.rm_ovinfo.fields.room_address;
                        $scope.zipcode = resp.rm_ovinfo.fields.room_zipcode;
                        $scope.description = resp.rm_ovinfo.fields.room_description;
                        $scope.successmsg = resp.msg;
                        $scope.room_ovinfo = {};
                        $scope.roomoverviewInfoForm.$setPristine();
                      }
                      else{
                        $scope.errmsg = resp.msg;
                      }

                 })
                 .error(function(resp){
                      console.log("response for error is",resp);
                 });
      
    }

    $scope.add_roominfo = function(rm_info){

        data = {'util':rm_info.utility,'avail':rm_info.availability,'bill':rm_info.bill,'desc':rm_info.description,'room_id':room_id};

        $scope.successmsg = ''
        $scope.errmsg = ''
        $http({method:"post",
                    url:"/add_roominfo/",
                    data:$.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   }).success(function(resp){
                    console.log("response for sending mail is",resp);
                    if(resp.status="success"){
                        $scope.successmsg = resp.msg;
                        $scope.rm_info = {};
                        $scope.roomInfoForm.$setPristine();
                      }
                      else{
                        $scope.errmsg = resp.msg;
                      }

                 })
                 .error(function(resp){
                      console.log("response for error is",resp);
                 });
    }

    $scope.delete_roominfo = function(id){
      data = {'room_id':room_id,'id':id}
      $http({method:"post",
                    url:"/delete_roominfo/",
                    data:$.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   }).success(function(resp){
                    console.log("response for sending mail is",resp);
                 })
                 .error(function(resp){
                      console.log("response for error is",resp);
                 });
    }



    //1. Used to list all selected files  
    $scope.files = [];  
  
    //2. a simple model that want to pass to Web API along with selected files  
    $scope.jsonData = {  
        room_id:room_id,
        name: "room",  
        comments: "description"  
    };  
    //3. listen for the file selected event which is raised from directive  
    $scope.$on("seletedFile", function (event, args) {  
        $scope.$apply(function () {  
            //add the file object to the scope's files collection  
            $scope.files.push(args.file);
            console.log($scope.files,"ffffff",$scope.files.length);

            if($scope.files.length == 0){
              $scope.file_val = true;
            }
            else{
              $scope.file_val = false;
            }

        });  
    });  

  
    //4. Post data and selected files.  
    $scope.save_images = function (room_ovinfo) { 
       
        $http({  
            method: 'POST',  
            url: "/upload_images/",  
            headers: { 'Content-Type': undefined },  
             
            transformRequest: function (data) {  
                var formData = new FormData();  
                formData.append("model", angular.toJson(data.model));  
                for (var i = 0; i < data.files.length; i++) {  
                    formData.append("file" + i, data.files[i]);  
                }  
                return formData;  
            },  
            data: { model: $scope.jsonData, files: $scope.files }  
        }).  
        success(function (data, status, headers, config) { 
            console.log(data,"ooooooooo"); 
            $scope.files = [];
            $scope.file_val = false;
        }).  
        error(function (data, status, headers, config) {  
          console.log(data,"oooooooo");
        });  
    };  

});

myapp.controller('overviewController',function($scope,$location,$http,$window,$localStorage){
    $scope.successmsg = ''
    $scope.errmsg = ''
    var room_id = Number($localStorage['room_id']);
    var room_code = $localStorage['room_code'];
    $scope.person_name = $localStorage['person_name'];
    $scope.person_role = $localStorage['role'];
    $scope.person_email = $localStorage['person_email'];

    
      $http({method:"GET",
                url:"/get_all_rooms/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("fff",resp);
              $scope.data = resp.get_all_rooms;
              $scope.room_count = resp.rooms_count;
              
         }).error(function(err){
                  console.log("error",err);
        });


    // $scope.mail_excel = function(user_email, subject, description){
    //   var user_email = 's1thcreator.choda@gmail.com';
    //   var subject = 'Excel_file Back_up upto date'
    //   var description = 'sssssssss'
    //   $http({method:"post",
    //                 url:"/mail_excel/",
    //                 data:$.param({'mail_id':user_email,'subject':subject,'desc':description}),
    //                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //                }).success(function(resp){
    //                 console.log("response for sending mail is",resp);
    //                 $scope.msg = resp;
    //              })
    //              .error(function(resp){
    //                   console.log("response for error is",resp);
    //                   $scope.errmsg = resp;
    //              });

    // }

});

myapp.directive('uploadFiles', function () {  
    return {  
        scope: true,        //create a new scope  
        link: function (scope, el, attrs) {  
            el.bind('change', function (event) {  
                var files = event.target.files;  
                //iterate files since 'multiple' may be specified on the element  
                for (var i = 0; i < files.length; i++) {  
                    //emit event upward  
                    scope.$emit("seletedFile", { file: files[i] });  
                }  
            });  
        }  
    };  
});  

myapp.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])


// myapp.controller('roomexptableController',function($scope,$location,$http,$window,$localStorage){
//     var room_id = Number($localStorage['room_id']);
//     var room_code = $localStorage['room_code'];
//     $scope.person_name = $localStorage['person_name'];
//     $scope.person_role = $localStorage['role'];
    
//     $http({method:"get",
//                 url:"/total/"+room_id+"/",
//                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//              }).success(function(resp){
//               console.log("88888888888888888888",resp);
//               $scope.data = resp;
//               for(var i=0;i<resp.length;i++){
//                 console.log("ggg ddddddd ssssss");
//                   $scope.persons_info.push(resp[i].persons_info)
//               }
//               console.log($scope.persons_info,"uuuuuu");

//               }).error(function(err){
//                         console.log("error",err);
//     });

//     $scope.edit_rec = function(id){
//       $http({method:"GET",
//                 url:"/edit_rec/"+id+"/",
//                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//              }).success(function(resp){
//                 $scope.take = [];
//                 $scope.take_list = [];
//                 console.log(resp,"ttttttt",$scope.user,"oppp",resp.item_info.fields.item_name);
//                 $scope.user.item = resp.item_info.fields.item_name;
//                 $scope.user.id = resp.item_info.pk;
//                 $scope.user.items = resp.item_info.fields.items_count;
//                 $scope.user.amt = resp.item_info.fields.item_cost;
//                 $scope.user.sign = resp.item_info.fields.payee;

//                 for(var j=0;j<resp.persons_info.length;j++){
//                   $scope.take.push(resp.persons_info[j].username);
//                   $scope.take_list.push({'name':resp.persons_info[j].username,'val':resp.persons_info[j].amount_to_pay});
//                 }

//              }).error(function(err){
//                   console.log("error",err);
//         });
//     }

//     $scope.delete_rec = function(id){
//           $http({method:"GET",
//                 url:"/delete_rec/"+id+"/",
//                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//              }).success(function(resp){
//               console.log("response for sending mail is",resp);
              
//          }).error(function(err){
//                   console.log("error",err);
//         });

//         }
// });