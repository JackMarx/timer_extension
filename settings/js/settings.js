(function (){
  "use strict",

  angular.module("app", []);

  angular.module("app").controller("settingsCtrl", function($scope,$http){
        var vault = window.localStorage;
        
        $scope.emailStored = false;


        $scope.setToken = function(email_token) {
            // sets or resets email token
            null === email_token ? delete vault["timer_email"] : vault["timer_email"] = email_token}

            if (vault["timer_email"]){
              $scope.emailStored = true;
            } else {
              $scope.emailStored = false;
            }
          }

  });
}());