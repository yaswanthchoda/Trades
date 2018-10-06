angular.module('myApp').controller('createshopController', createshopController);
createshopController.$inject = ['$scope', '$location', '$http', '$localStorage'];
function createshopController($scope, $location, $http, $localStorage) {
  $scope.successmsg = '';
  $scope.errmsg = '';

  $scope.create_shop = function(shop_details){
    $scope.successmsg = '';
    $scope.errmsg = '';
    $scope.authtoken = $localStorage['token'];
  
    $http({method:"post",url:"/api/v1/traders/",data:$.param(shop_details),
           headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': $scope.authtoken}
          }).success(function(resp){
            console.log(resp,";ll");
            $scope.successmsg = resp.status;
            $scope.shop_details = {};
            $scope.createShopForm.$setPristine();

          }).error(function(resp){
            $scope.errmsg = resp.status;
            console.log($scope.errmsg);
          });
  }
};