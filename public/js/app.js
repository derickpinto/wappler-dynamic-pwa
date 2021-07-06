
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
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
