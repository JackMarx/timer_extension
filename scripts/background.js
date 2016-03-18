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
          localStorage.setItem('timer_email', null);
          sendResponse();
          return true;
      }
    }
  );

  if (window.localStorage["timer_email"]){
    chrome.tabs.onHighlighted.addListener(function(something){
      chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
        $.ajax({
          type: 'POST',
          url: "http://andre-app.herokuapp.com/visits",
          data:{url: tabs[0].url, time: Date.now(), email: window.localStorage["timer_email"], action: "entered"},
          success: function (response) {
            // alert("success");
          }
        });
      })
    });

    // chrome.tabs.onRemoved.addListener(function(something){
    //   chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    //      function(tabs){
    //         console.log({url: tabs[0].url, time: Date.now(), user: "joe@gmail.com", action: "removed"});
    //      }
    //   )
    // });

  }
}());