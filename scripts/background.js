(function () {
  "use strict";

  chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
      chrome.pageAction.show(sender.tab.id);

      if (request.command == 'saveToken') {
          localStorage.setItem('timer_email', request.token);
          sendResponse();
          return true;
      }

      if (request.command == 'deleteToken') {
          delete localStorage['timer_email'];
          sendResponse();
          return true;
      }
    }
  );

  alert(localStorage["timer_email"]);

  chrome.tabs.onHighlighted.addListener(function(something){
    if (localStorage["timer_email"]){
      chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
        $.ajax({
          type: 'POST',

          // ********************************************************
          // change to your api endpoint ************************
          url: "http://andre-app.herokuapp.com/visits",

          // ********************************************************
          // This is the json that goes to your api *****************
          data:{url: tabs[0].url, time: Date.now(), email: window.localStorage["timer_email"], action: "entered"},

          success: function (response) {
            // alert("success");
          }
        });
      })
    }
  });

    // ********************************************************
    // Below is to add another marker when a tab is removed you 
    // will have to complete it using the code above as an example. 
    // ********************************************************

    // chrome.tabs.onRemoved.addListener(function(something){
    //   chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    //      function(tabs){
    //         console.log({url: tabs[0].url, time: Date.now(), user: "joe@gmail.com", action: "removed"});
    //      }
    //   )
    // });

}());