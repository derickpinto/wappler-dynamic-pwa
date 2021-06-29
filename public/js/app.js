if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(function (event) {
            console.log('Service worker is registered');
        })
        .catch(function (error) {
            console.log('Service worker is not registered');
        })
}



function syncComment() {

    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then(function (swRegistration) {
            return swRegistration.sync.register('sync-post-comment');
        });
    }

}