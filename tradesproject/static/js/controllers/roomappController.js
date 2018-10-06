angular.module('myApp').controller('roomappController', roomappController);
roomappController.$inject = ['$scope','$location','$http','$window','$localStorage','$state','$rootScope','$timeout'];
function roomappController($scope,$location,$http,$window,$localStorage, $state, $rootScope, $timeout) {
$rootScope.$on('$stateChangeSuccess', function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
  $http.get('/out/').success(function(resp){
	         	$scope.obj = resp.status;
	         	// console.log("from success : ",$scope.obj);
	         	
	         	if ($scope.obj == 'user_id not there'){
                    alert("Please Login");
	         		$location.url('/login');
	         	}
	         	else{
	         		
	         	}
	         	
	         }); 

  $rootScope.myVar = 'ok';
  $scope.obj='';
  $scope.role = $localStorage['role'];
  $scope.person_name = $localStorage['person_name'];
  $scope.person_email = $localStorage['person_email'];
  $scope.room_name = $localStorage['room_name'];
  $scope.room_code = $localStorage['room_code'];
  $scope.profile_pic = $localStorage['profile_pic'];
  // $scope.thumbnail.dataUrl = 

  $scope.room_id = $localStorage['room_id'];
  $scope.member_id = $localStorage['login_id'];
  $scope.room_code = $localStorage['room_code'];

  $scope.$state = $state;

    $(".pf_brand").click(function(){
        $(".pro_menu").slideToggle(300);
    });

    $scope.open_menu = true;

    $scope.openNav = function () {
        $("#mySidenav").css({'width': "250px"});
        $scope.open_menu = !$scope.open_menu;
    }

    $scope.closeNav = function () {
        $("#mySidenav").css({'width': "0px"});
        $scope.open_menu = !$scope.open_menu;
    }

	         
	   $scope.signout=function(){

	   	$http.get('/logout/')
	   	    .success(function(resp){
	         	console.log('from signout',resp)
	         	$location.url('/');
	         }).error(function(resp){
	         	
	         });

	   }      	
  
		$scope.mailit=function(mail_id,content,subject){
			$http({method:"post",
	              url:"/sendmail/",
	              data:$.param({'mail_id':mail_id,'content':content,'subject':subject}),
	              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		         }).success(function(resp){
		         	console.log("response for sending mail is",resp);
				 }).error(function(resp){
            console.log("response for error is",resp);
            $scope.errmsg = resp;
       });

		}
		// $scope.file_data = undefined;
		// $scope.file_data = $("#profile_picture").prop("files")[0];
		// console.log($scope.file_data ,"________________");

		$scope.select_profile_pic = function(w){
			console.log(w,"------------------");
			$scope.profile_pic = $("#chng_pp").prop("files")[0];
			console.log($scope.profile_pic,"______________________________________");
			$scope.$apply();

		}

		$scope.update_profile_pic = function(){
			// console.log($("#chng_pp").prop("files"/) ,"_555555555555555__");
        $scope.imagefile_data = $("#chng_pp").prop("files")[0];
        console.log($scope.imagefile_data ,"________________");
        $scope.jsonData = {  
            'room_id': $scope.room_id,
            'room_code': $scope.room_code,
            'login_id' : $scope.member_id

        };

        $http({  
            method: 'POST',  
            url: "/update_profile_pic/",  
            headers: { 'Content-Type': undefined },  
             
            transformRequest: function (data) {  
                var formData = new FormData();  
                formData.append("model", angular.toJson(data.model));  
                formData.append("avatar_file", data.files);
                
                return formData;  
            },  
            data: { model: $scope.jsonData, files: $scope.imagefile_data }  
        }).  
        success(function (data, status, headers, config) { 
            console.log(data,"ooooooooo"); 
            $scope.files = [];
            $localStorage['profile_pic'] = data.profile_pic;
            $scope.profile_pic = $localStorage['profile_pic'];
            alert("Your Information Updated Successfully");
            // $location.url('/roomapp/members');
        }).  
        error(function (data, status, headers, config) {  
          console.log(data,"oooooooo");
        }); 

    } 



    $scope.thumbnail = {
        dataUrl: 'adsfas'
    };
    $scope.fileReaderSupported = window.FileReader != null;
    $scope.photoChanged = function(files){
        if (files != null) {
            var file = files[0];
        if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
            $timeout(function() {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function(e) {
                    $timeout(function(){
 					// $scope.thumbnail.dataUrl = e.target.result;
                    $scope.profile_pic = e.target.result;
                    });
                }
            });
        }
    }
    };

};

