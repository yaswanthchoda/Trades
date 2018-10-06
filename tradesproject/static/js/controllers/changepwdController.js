angular.module('myApp').controller('changepwdController', changepwdController);
changepwdController.$inject = ['$scope','$location','$http','$window'];
function changepwdController($scope, $location,$http,$window) {
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

};