const notificationButton = document.querySelector(".floating-notification");


if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw-base.js')
            .then(function () {
                console.log('Service worker is registered');
            })
            .catch(function (error) {
                console.log('Service worker is not registered', error.message);
            });
    });
}


function syncComment() {

    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then(function (swRegistration) {
            return swRegistration.sync.register('sync-post-comment');
        });
    }

}

function displayConfirmNotification() {
    if ("serviceWorker" in navigator) {
        var options = {
            body: "You successfully subscribed to our Notification service!",
            icon: "/assets/icon/icon-96.png",
            image: '/assets/icon/icon-96.png',
            dir: "ltr",
            lang: "en-US", // BCP 47,
            vibrate: [100, 50, 200],
            badge: "assets/icon/icon-96.png",
            tag: "confirm-notification",
            renotify: true,
        };

        navigator.serviceWorker.ready.then(function (swreg) {
            swreg.showNotification("Successfully subscribed!", options);
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


function configurePushSub() {
    console.log("1")
    if (!('serviceWorker' in navigator)) {
        return;
    }

    var reg;
    navigator.serviceWorker.ready
        .then(function (swreg) {
            reg = swreg;
            return swreg.pushManager.getSubscription();
        })
        .then(function (sub) {
            if (sub === null) {
                // Create a new subscription
                var vapidPublicKey = 'BM8twj8dS1TAZMFGU2OHcJ32UEO7XBQnKrbBO5jYLByToAyG_DgIOdc9jwBmz4orzSYzThNoy8m2JVQ-Q_QufS0';
                var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
                return reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey
                });
            } else {
                // We have a subscription
            }
        })
        .then(function (newSub) {
            if (!newSub) {
                return;
            }

            let payload = JSON.parse(JSON.stringify(newSub));

            return fetch('/api/post_data/add_new_subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    endpoint: payload.endpoint,
                    authKey: payload.keys.auth,
                    p256dh: payload.keys.p256dh,
                })
            })
        })
        .then(function (res) {
            if (res && res.ok) {
                displayConfirmNotification();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}


function askForNotificationPermission() {
    Notification.requestPermission(function (result) {

        if (result !== 'granted') {
            console.log('No notification permission granted!');
        } else {
            configurePushSub();
            // displayConfirmNotification();
        }
    });
}

if ('Notification' in window && 'serviceWorker' in navigator) {
    notificationButton.style.display = "flex";
    notificationButton.addEventListener(
        "click",
        askForNotificationPermission
    );
}