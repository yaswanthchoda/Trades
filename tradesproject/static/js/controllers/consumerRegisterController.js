angular.module('myApp').controller('consumerRegisterController', consumerRegisterController);
consumerRegisterController.$inject = ['$scope','$location','$http'];
function consumerRegisterController($scope,$location,$http) {
  $scope.successmsg = '';
  $scope.errmsg = '';
  $scope.reg_user = {};
  $scope.form_title = 'Consumer Registration Form';
  $scope.user_type = 'Consumer';
  $scope.user_type_value = false;
  

  $scope.register = function(reg_user){
    $scope.successmsg = '';
    $scope.errmsg = '';
    
  
    $http({method:"post",url:"/api/v1/register/",data:$.param(reg_user),
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(resp){
            console.log(resp,";ll");
            $scope.successmsg = resp.status;
            $scope.reg_user = {};
            $scope.registerForm.$setPristine();

          }).error(function(resp){
            $scope.errmsg = resp.status;
            console.log($scope.errmsg);
          
          });

  }
  
};