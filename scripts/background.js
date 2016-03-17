(function () {
  "use strict";

  chrome.tabs.onHighlighted.addListener(function(something){
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
      $.ajax({
        type: 'POST',
        url: "http://andre-app.herokuapp.com/visits",
        data:{url: tabs[0].url, time: Date.now(), user: "joe@gmail.com", action: "entered"},
        success: function (data) {
          alert("Success: " + data.url);
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

}());