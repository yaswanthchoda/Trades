angular.module('myApp').controller('traderRegisterController', traderRegisterController);
traderRegisterController.$inject = ['$scope','$location','$http'];
function traderRegisterController($scope,$location,$http) {
  $scope.successmsg = '';
  $scope.errmsg = '';
  $scope.reg_user = {};
  $scope.form_title = 'Trader Registration Form';
  $scope.user_type = 'Trader';
  $scope.user_type_value = true;


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