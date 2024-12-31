//the [] are used to put the dependencies
//myAngularApp use this in the index.html file to declare the ng-app dependencies
//angularApp use this the app.js file to declare alongside the .controller
var angularApp = angular.module("myAngularApp", ['ngRoute', 'ngAnimate']);

angularApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode = (true);
    
    $routeProvider
    .when('/home',{
        templateUrl: 'views/home.html',
        controller: 'angularAppController'
    })

    .when('/contact',{
        templateUrl: 'views/contact.html',
        controller: 'contactController'
    })

    .when('/contact-success',{
        templateUrl: 'views/contact-success.html',
        controller: 'contactController'
    })

    .when('/directory',{
        templateUrl: 'views/directory.html',
        controller: 'angularAppController'
    })
    .otherwise({
        redirectTo: '/home'
    })
}])

angular.module('myAngularApp').run(['$templateCache', function($templateCache)
    {
        $templateCache.put('header.html', '<div id = "menu-bar"></div>');
    }
]);

angularApp.directive('randomCity', [function(){
    return {
        restrict: 'E',
        scope: {
            cities : "=",
            title : "="
        },
        templateUrl: 'views/random.html',
        transclude: true,   //this is used to include the random changes done in home.html to get included 
        replace: true,
        controller: function($scope){
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}]);
angularApp.controller('angularAppController', ['$scope,  $http', function($scope, $http){
    // $scope.message = "Heyya...Welcome to Angular Practise";
    
    $scope.removeCity = function(city){
        var removedCity = $scope.cities.indexOf(city);
        $scope.cities.splice(removedCity, 1);
    };
    // here we are creating a scope to add city and within that a object of the values that our form will take
    $scope.addCity = function(){
        $scope.cities.push({
            name: $scope.newCity.name,
            food: $scope.newCity.food,
            historicalPlace: $scope.newCity.historicalPlace,
            rate: parseInt($scope.newCity.rate),      //parseInt will store the rate as a integer value instead a string value
            affordable: $scope.newCity.affordable,
            color: $scope.newCity.color,
        });
        
        //Do this additional things to clear out the previous form data to enter new data
        $scope.newCity = {};
    };

    //removeall method is controlled here
    $scope.removeAll = function(){
        $scope.cities = [];
    };
    //this will grab the data from external source and bring in the controller app of ours
    $http.get('data/cities.json').success(function(data) {
        $scope.cities = data;
    });
//this will convert all the cities objects into json
console.log(angular.toJson($scope.cities));
}]);

angularApp.controller('contactcontroller', ['$scope', '$location', function($scope, $location) {
    $scope.sendMessage = function(){
        $location.path('contact-success');
    };
}]);
