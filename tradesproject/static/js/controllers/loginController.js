angular.module('myApp').controller('loginController', loginController);
loginController.$inject = ['$scope','$location','$http','$window','$localStorage', '$rootScope'];
function loginController($scope,$location,$http,$window,$localStorage, $rootScope) {
  $rootScope.myVar = 'no';

   $scope.register=function(){
      $location.path('/signup');  
    }

    $scope.forgot=function(){
      $location.path('/getpwd');  
    }

    $scope.change=function(){
      $location.path('/changepwd');  
    }


    $scope.login = function(username,password){
      $scope.successmsg = '';
      $scope.errmsg = '';
      $http({method:"post",
                url:"/api/v1/login/",
                data:$.param({'username':username,'password':password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                // headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': $scope.authtoken}
            }).success(function(resp){
              console.log("66666666666666666",resp);
              $localStorage['token'] = "Token "+resp.authtoken.auth_token;
              // var room_id = resp.room_id;
              // var room_name = resp.room_name;
              // var room_code = resp.room_code;
              // var login_id = resp.login_id;
              // var role = resp.role;
              // var person_name = resp.person_name;
              // var person_email = resp.person_email;
              // var profile_pic = resp.profile_pic;
              
              // $localStorage['room_id'] = room_id;
              // $localStorage['room_name'] = room_name;
              // $localStorage['room_code'] = room_code;
              // $localStorage['login_id'] = login_id;
              // $localStorage['role'] = role;
              // $localStorage['person_name'] = person_name;
              // $localStorage['profile_pic'] = profile_pic;
              // $localStorage['person_email'] = person_email;

              if (resp.redirect_to == 'consumer'){
                  $scope.successmsg = resp.status;
                    $location.path('/consumer');
              }
              else if(resp.redirect_to == 'trader'){
                  $scope.successmsg = resp.status;
                    $location.path('/trader');
              }
              else if(resp.redirect_to == 'createshop'){
                  $scope.successmsg = resp.status;
                  $location.path('/createshop');
              }
              else{
                $scope.errmsg = resp.status;
                // $location.path('/create_shop');
                console.log($scope.errmsg);
              }
                    
            });
      }
};