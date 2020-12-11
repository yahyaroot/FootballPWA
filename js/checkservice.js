
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
              console.log("Service Worker registration is successful!");
              requestPermission();
            })
            .catch(function () {
              console.log("Service Worker registration failed!");
            });
        });
      } else {
        console.log("Service Workers are not supported yet");
      }
  
      function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }
    
      function requestPermission(){
        if ('Notification' in window){
          Notification.requestPermission().then(function (result){
            if (result === "denied"){
              console.log("Notification feature is not allowed. ");
              return;
            } else if (result === "default"){
              console.error("The user closes the permission request dialog box.");
              return;
            }
  
            if (('PushManager' in window)) {
              navigator.serviceWorker.getRegistration().then(function (registration) {
                registration.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(
                    "BOo02K9wRfGwa0UdijxiKa9YzYlW1a_9I3oPM8fLILQXk3hIMg9FozjLZ_MkT0pXAE-RFZIjSZDf75bV14HGSb0"
                  )
                }).then(function (subscribe) {
                  console.log('Successfully subscribed with an endpoint: ', subscribe.endpoint);
                  console.log('Successfully subscribed with key p256dh: ', btoa(String.fromCharCode
                    .apply(
                      null, new Uint8Array(subscribe.getKey('p256dh')))));
                  console.log('Successfully subscribed with auth key: ', btoa(String.fromCharCode
                    .apply(null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function (e) {
                  console.error('Unable to subscribe ! :( ', e.message);
                });
              });
            }
          });
        }
      }
  