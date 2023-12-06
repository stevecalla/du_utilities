// https://developer.mozilla.org/en-US/docs/Web/API/notification
// https://mdn.github.io/dom-examples/to-do-notifications/
// https://github.com/mdn/dom-examples/blob/main/to-do-notifications/scripts/todo.js
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/openCursor
// https://www.youtube.com/watch?v=Bm0JjR4kP8w


// source: https://stackoverflow.com/questions/6092885/what-ways-are-out-there-to-display-a-desktop-notification-from-a-web-app/13328397#13328397
// https://stackoverflow.com/questions/53011652/desktop-notification-not-appearing-in-chrome

// CREATE VARIABLES
let count = 0;
let showNotificationButton = document.createElement("button");
let countDownButton = document.createElement("button");
let windowBody = document.querySelector("body");
let countDownTimer = document.createElement("p");

// ADD TEXT CONTENT / ATTRIBUTES / APPEND
showNotificationButton.textContent = "Show Notification";
showNotificationButton.setAttribute(
  "style",
  "background-color: black; color: white; border: 1px solid black"
);
countDownButton.textContent = "CountDown Button";
countDownButton.setAttribute(
  "style",
  "background-color: black; color: white; border: 1px solid black; margin: 10px"
);
countDownTimer.textContent = count;

windowBody.appendChild(showNotificationButton);
windowBody.appendChild(countDownButton);
windowBody.appendChild(countDownTimer);

// ADD EVENT LISTENER(S)
showNotificationButton.addEventListener("click", notifyMe);
countDownButton.addEventListener("click", intervalAnimation);

// request permission on page load
document.addEventListener("DOMContentLoaded", function () {
  if (Notification.permission !== "granted") Notification.requestPermission();
});

// ADD FUNCTION(S)
// SECTION //CLICK NOTIFICATION
function notifyMe() {
  console.log('notify me');
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    // const notification = new Notification("Hi there!");

    var notification = new Notification("Notification title", {
      icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
      body: `Hey there! You've been notified! ${count}`,
      // tag: "test"
    });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
    };

    // alert();

    // notification.close();
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        // const notification = new Notification("Hi there!");

        var notification = new Notification("Notification title", {
          icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
          body: `Hey there! You've been notified! ${count}`,
        });
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

// SECTION //RUN NOTIFICATION USING INTERVAL
function intervalAnimation() {

  let intervalTest = setInterval(function () {
    console.log(count);
    countDownTimer.textContent = count;
    count++;

    if (count % 5 === 0) {
      showNotificationButton.click();
      // notifyMe();
    }

    if (count % 21 === 0) {
      clearInterval(intervalTest);
      count = 0;
    }

  }, 1000);

}
