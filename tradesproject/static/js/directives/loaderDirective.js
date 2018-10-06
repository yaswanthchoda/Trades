angular.module('myApp')  
 .directive('loading',   ['$http' ,function ($http)  
 {  
     return {  
         restrict: 'A',  
         template: '<img src="static/images/loaders/lo.gif" /><p class="loading_msg">Processing...</p>',  
         link: function (scope, elm, attrs)  
         {  
             scope.isLoading = function () {  
                 return $http.pendingRequests.length > 0;  
             };  
  
             scope.$watch(scope.isLoading, function (v)  
             {  
                 if(v){  
                     elm.show();  
                 }else{  
                     elm.hide();  
                 }  
             });  
         }  
     };  
 }])  