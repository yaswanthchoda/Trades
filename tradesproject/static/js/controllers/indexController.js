angular.module('myApp').controller('indexController', indexController);
indexController.$inject = ['$scope','$location','$http','$window','$rootScope'];
function indexController($scope,$location,$http,$window, $rootScope) {
	$rootScope.myVar = 'no';
	window.scrollTo(0, 0);
	// alert($rootScope,myVarVar+"___________");
};