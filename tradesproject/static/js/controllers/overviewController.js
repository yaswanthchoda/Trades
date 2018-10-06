angular.module('myApp').controller('overviewController', overviewController);
overviewController.$inject = ['$scope','$location','$http','$window','$localStorage'];
function overviewController($scope,$location,$http,$window,$localStorage) {
    $scope.successmsg = ''
    $scope.errmsg = ''
    $scope.super_user = false;
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
              if(resp.super_user=='auth_none'){
                $scope.super_user = false;

              }
              
         }).error(function(err){
                  console.log("error",err);
        });

    $scope.admin_logout = function(){
      $scope.super_user = false;
    }


    $scope.adminlogin = function(admin){

      $http({method:"post",
                    url:"/get_all_rooms/",
                    data:$.param(admin),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   }).success(function(resp){
                    console.log("response for sending mail is",resp);
                    $scope.msg = resp;
                    $scope.data = resp.get_all_rooms;
                    $scope.room_count = resp.rooms_count;
                    if(resp.super_user=='auth'){
                      $scope.super_user = true;

                    }
                 })
                 .error(function(resp){
                      console.log("response for error is",resp);
                      $scope.errmsg = resp;
                 });

    }

    // $http({method:"GET",
    //             url:"/all_images/",
    //             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //          }).success(function(resp){
    //           console.log("fff",resp);
    //           $scope.data = resp.get_all_rooms;
    //           $scope.room_count = resp.rooms_count;
    //           $scope.path = resp.path;
              
    //      }).error(function(err){
    //               console.log("error",err);
    //     });
};