angular.module('myApp').controller('contactController', contactController);
contactController.$inject = ['$scope','$location','$http','$window','$localStorage'];
function contactController($scope,$location,$http,$window,$localStorage) {
    $scope.successmsg = ''
    $scope.errmsg = ''
    $scope.super_user = false;
    var room_id = Number($localStorage['room_id']);
    var room_code = $localStorage['room_code'];
    $scope.person_name = $localStorage['person_name'];
    $scope.person_role = $localStorage['role'];
    $scope.person_email = $localStorage['person_email'];
    $scope.login_id = $localStorage['login_id'];

    $scope.contact = function(use_name, user_email, subject, message){
              $scope.successmsg = ''
              $scope.errmsg = ''
              $http({method:"post",
                          url:"/contactmail/",
                          data:$.param({'user_name':use_name,'mail_id':user_email,'subject':subject,'desc':message,'login_id':$scope.login_id}),
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                     }).success(function(resp){
                      console.log("response for sending mail is",resp);
                      if(resp.status="success"){
                        $scope.successmsg = resp.msg;
                        $scope.contact = {};
                        $scope.ContactUsForm.$setPristine();
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

};