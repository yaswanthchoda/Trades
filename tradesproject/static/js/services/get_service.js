angular.module('myApp').factory('getRoomData', function($http,$localStorage) {
    
    


    var getRecords = function() {
        var room_id = Number($localStorage['room_id']);
        var room_code = $localStorage['room_code'];
        var login_id = $localStorage['login_id'];

        // Angular $http() and then() both return promises themselves 
        return $http({method:"GET", url:"/total/"+room_id+"/"+login_id+"/"}).then(function(result){

            // What we return here is the data that will be accessible 
            // to us after the promise resolves
            return result;
        });
    };

    return { getRecords: getRecords };
});

angular.module('myApp').factory('getRoomMembers', function($http,$localStorage) {
    
    


    var getMembers = function() {
        var room_id = Number($localStorage['room_id']);
        var room_code = $localStorage['room_code'];
        var login_id = $localStorage['login_id'];
        return $http({method:"GET", url:"/getuser_list/"+room_id+"/"+login_id+"/"}).then(function(result){
            return result;
        });
    };

    return { getMembers: getMembers };
});
