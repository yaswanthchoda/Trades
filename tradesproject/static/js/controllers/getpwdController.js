angular.module('myApp').controller('getpwdController', getpwdController);
getpwdController.$inject = ['$scope','$location','$http','$window'];
function getpwdController($scope,$location,$http,$window) {

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

};