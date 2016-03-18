(function (){
  "use strict",

  angular.module("app", []);

  angular.module("app").controller("settingsCtrl", function($scope){
    $scope.setup = function(){
      $scope.vault = window.localStorage;
      $scope.emailStored = false;
    };

    $scope.setToken = function(email_token) {
      // sets or resets email token
      null === email_token ? $scope.vault["timer_email"] = null : $scope.vault["timer_email"] = email_token;
      if (localStorage["timer_email"] !== "undefined" || localStorage["timer_email"])
        chrome.extension.sendMessage({
          command: 'saveToken',
          token: localStorage.getItem('timer_email')
        }, function(data) {
          $scope.emailStored = true;
            // chrome.tabs.getCurrent(function (tab) {
            //     chrome.tabs.remove(tab.id);
            // });
          });
    } else {
      chrome.extension.sendMessage({
        command: 'deleteToken',
        token: localStorage.getItem('timer_email')
      }, function(data) {
        $scope.emailStored = true;
      });
    // }

  };
  });
}());
