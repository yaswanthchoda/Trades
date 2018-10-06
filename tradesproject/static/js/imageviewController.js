angular.module('myApp').controller('imageviewController', imageviewController);
imageviewController.$inject = ['$scope','$location','$http','$window','$localStorage'];
function imageviewController($scope,$location,$http,$window,$localStorage) {
    $scope.successmsg = ''
    $scope.errmsg = ''
    $scope.super_user = false;
    var room_id = Number($localStorage['room_id']);
    var room_code = $localStorage['room_code'];
    $scope.person_name = $localStorage['person_name'];
    $scope.person_role = $localStorage['role'];
    $scope.person_email = $localStorage['person_email'];

    
      $http({method:"GET",
                url:"/all_images/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(resp){
              console.log("fff",resp);
              $scope.data = resp.get_all_rooms;
              $scope.room_count = resp.rooms_count;
              
         }).error(function(err){
                  console.log("error",err);
        });

    
};