(function (){
  "use strict",

  angular.module("app", []);

  angular.module("app").controller("settingsCtrl", function($scope){
    $scope.setup = function(){
      if (!localStorage["timer_email"]){
        $scope.emailStored = false;
      } else {
        $scope.emailStored = true;
      }
    };

    $scope.setToken = function(email_token) {
      // sets or resets email token
      
      if (email_token){
        window.localStorage["timer_email"] = email_token;
        $scope.emailStored = true;

        chrome.extension.sendMessage({
          command: 'saveToken',
          token: localStorage.getItem('timer_email')
        }, function(data) {
            // ****************************************
            // if you uncomment the code below it will close 
            // the options page when you save the token
            // ****************************************

            // chrome.tabs.getCurrent(function (tab) {
            //     chrome.tabs.remove(tab.id);
            // });
          });
      } else {
        delete window.localStorage["timer_email"];
        $scope.emailStored = false;

        chrome.extension.sendMessage({
          command: 'deleteToken',
          token: localStorage.getItem('timer_email')
        }, function(data) {
          // ****************************************
          // if you uncomment the code below it will close 
          // the options page when you delete the token
          // ****************************************

          // chrome.tabs.getCurrent(function (tab) {
          //     chrome.tabs.remove(tab.id);
          // });
        });
      }
    };
  });
}());
