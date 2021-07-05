var deferredPrompt = null;

if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw-base.js')
            .then(function (event) {
                console.log('Service worker is registered');
            })
            .catch(function (error) {
                console.log('Service worker is not registered');
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


window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});
