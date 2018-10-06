var myapp = angular.module('myApp',['ui.router','ngStorage','ui.bootstrap']);

myapp.config(function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
       $stateProvider
        .state('/',{
                          url:'/',
                          templateUrl:'/static/views/index.html',
                          controller:'indexController'
                        })
        .state('login',{
            				      url:'/login',
            				      templateUrl:'/static/views/login.html',
            				      controller:'loginController'
		                    })
        .state('about',{
                          url:'/about',
                          templateUrl:'/static/views/about.html',
                          controller:'aboutController'
                        })
        .state('contact',{
                          url:'/contact',
                          templateUrl:'/static/views/contact.html',
                          controller:'contactController'
                        })
        .state('overview',{
                          url:'/overview',
                          templateUrl:'/static/views/overview.html',
                          controller:'overviewController'
                        })
        .state('imageview',{
                          url:'/imageview',
                          templateUrl:'/static/views/imageview.html',
                          controller:'imageviewController'
                        })
        .state('trader',{
            				      url:'/trader',
            				      templateUrl:'/static/views/trader.html',
            				      controller:'traderController'
		                    })
        .state('addconsumer',{
                          url:'/addconsumer',
                          templateUrl:'/static/views/admin_register.html',
                          controller:'addconsumerController'
                        })
        .state('createshop',{
                          url:'/createshop',
                          templateUrl:'/static/views/create_shop.html',
                          controller:'createshopController'
                        })
        .state('register_as_trader',{
                          url:'/register_as_trader',
                          templateUrl:'/static/views/register.html',
                          controller:'traderRegisterController'
                        })
        .state('register_as_consumer',{
                          url:'/register_as_consumer',
                          templateUrl:'/static/views/register.html',
                          controller:'consumerRegisterController'
                        })
		    .state('getpwd',{
          		    	      url:'/getpwd',
                          templateUrl : '/static/views/forgotpassword.html',
                          controller  : 'getpwdController'
                        })
        .state('changepwd',{
                          url:'/changepwd',
                          templateUrl : '/static/views/changepassword.html',
                          controller  : 'changepwdController'
                        })


    });