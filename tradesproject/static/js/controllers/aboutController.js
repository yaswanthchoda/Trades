angular.module('myApp').controller('aboutController', aboutController);
aboutController.$inject = ['$scope','$location','$http','$window','$localStorage'];
function aboutController($scope,$location,$http,$window,$localStorage) {
    $scope.successmsg = ''
    $scope.errmsg = ''
    $scope.super_user = false;
    var room_id = Number($localStorage['room_id']);
    var room_code = $localStorage['room_code'];
    $scope.person_name = $localStorage['person_name'];
    $scope.person_role = $localStorage['role'];
    $scope.person_email = $localStorage['person_email'];

};