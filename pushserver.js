const webpush = require('web-push');
console.log(webpush.generateVAPIDKeys());

// const publicKey ='BNpl7wkG2moxWWiUHwcQSztroXmECyS6dTqkaqAB6hr31FGE3R5_K_DHhowSGo9p2cBRMwAfNrzzZOPiJk23NEg'
const publicKey ='BJkUsZs9QYXvusPKt-2SJ_LZD8Y6L3HHEJjP9rVNaiBgjOCr5aLyGMGGJelLMi4eh-2M7SyRbQPZvEok1iYtTuA'
//  const privateKey = 'gVkUE2PA7mkAB6MQuK3L64U4kuOmJsG_Z7yUMJT1rFk'
 const privateKey = '23muu1by01FPDCNc23fLINamkKGXY7HRfg0KZohghw4'

webpush.setVapidDetails('mailto:example@yourdomain.com', publicKey, privateKey)

// const sub = {
//   endpoint:
//     'https://fcm.googleapis.com/fcm/send/cWcv1sS0Ea8:APA91bE04rsxL3C9OR7VDT8iNNy1wnkLUhfdjhfdfhjGq3qlJX-DYkE7Gm9IYAhHVKdqEpkxjoO1ZY75ljclawWW9VtfWt9M56rfkBUPD25egHoRCWPf3yBD8daER71PayRM4mzPi30w',
//   expirationTime: null,
//   keys: {
//     p256dh:
//       'BDo85DDt4k4XrNhlEQG6qaJkYuWewm7kLNk8LZ7fdkfjdk-CUeGvrQGvZorJuS96X-U1P9J7Tn3uBxNNtsdgY0',
//     auth: 'x3Q6AeNsZyfjdkf7lkTQRQ',
//   },
// };

const payLoad = {
    "notification": {
        "title" : 'Información',
        "vibrate": [100, 50, 100]
        }
    }

 webpush.sendNotification(sub, JSON.stringify(payLoad));
