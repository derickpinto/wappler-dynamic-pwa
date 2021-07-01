
var dbPromise = idb.open('comment-store', 1, function (db) {
    if (!db.objectStoreNames.contains('posts')) {
        db.createObjectStore('comment', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('sync-posts')) {
        db.createObjectStore('sync-comments', { keyPath: 'datetime1' });
    }
});

function writeData(st, data) {
    return dbPromise
        .then(function (db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.put(data);
            return tx.complete;
        });
}

function readAllData(st) {
    return dbPromise
        .then(function (db) {
            var tx = db.transaction(st, 'readonly');
            var store = tx.objectStore(st);
            return store.getAll();
        });
}

function clearAllData(st) {
    return dbPromise
        .then(function (db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.clear();
            return tx.complete;
        });
}

function deleteItemFromData(st, id) {
    dbPromise
        .then(function (db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.delete(id);
            return tx.complete;
        });
}

function storeOfflineComments(data) {

    const url = "/api/post_data/post_new_comment";

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                datetime: data.datetime,
                name: data.name,
                url: data.image,
                comment: data.message
            })
        }).then(async (res) => {


            if (res.ok) {
                await deleteItemFromData('sync-comments', data.datetime1);
                resolve();
            }

        }).catch((error) => {
            console.log('[error post message]', error.message);
            throw error;
        })
    })

}