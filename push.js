let webPush = require('web-push');

const vapidKeys = {
    "publicKey" : "BOo02K9wRfGwa0UdijxiKa9YzYlW1a_9I3oPM8fLILQXk3hIMg9FozjLZ_MkT0pXAE-RFZIjSZDf75bV14HGSb0",
    "privateKey" : "fIhPnlpZRDKV3aRLDdnHuMLNdGl2-cBG5zvE4N-PLSw"
};

webPush.setVapidDetails(
    'mailto:yahya.amryk@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dFtPV-cYYd0:APA91bHwIVtZAyMs2qCZOLKBcMzSj7ixQOIi8InT67CHEaeCjzelVtNM8buC8-HkhxOShMNAj_XYvk8nbOiX0_BhzV8E2aUUyt20mJCXtoPo3WWLFSy6GtNtFUsHfsrsFhLpGO3XGXLO",
    "keys" : {
        "p256dh":"BKJkYPfu2PU10WOW6XlEeLgk3PrKRcmDQGxBUcVAkHJ6fvk+tXderHw5YetW1SN2KaX17gKnGDSmAlKl2m/4I1k=",
        "auth": "nrIRcziiiAhWpqjXJrU0SA=="
    }
};
let payload = 'Selamat ! Aplikasi Anda sudah dapat menerima push notifikasi!';
let options = {
    gcmAPIKey: '329571749629',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);