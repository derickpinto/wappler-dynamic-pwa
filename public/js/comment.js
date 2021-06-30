function resetLocalValues(newComment) {
    var oldComments = dmx.parse('content.index_local.data.get_comment');

    var lastComment = oldComments[0];

    if (lastComment) {
        newComment["id"] = lastComment["id"] + 1;
    } else {
        newComment["id"] = 1;
    }

    var newArray = [newComment].concat(oldComments);

    dmx.parse('content.index_local.set("get_comment",' + JSON.stringify(newArray) + ')');
}

function registerOneTimeSync() {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(function (reg) {
            if (reg.sync) {
                reg.sync.register('sync-new-comment')
                    .then(function (event) {
                        console.log('Syncistration successful', event);
                    })
                    .catch(function (error) {
                        console.log('Syncistration failed', error);
                    });
            } else {
                console.log("Onw Sync not supported");
            }
        });
    } else {
        console.log("Nove ServiceWorker");
    }
}

const sendComments = (payload) => {

    fetch("/api/post_data/post_new_comment", {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            datetime: payload.datetime,
            name: payload.name,
            url: payload.image,
            comment: payload.message
        })
    }).then(res => {
        dmx.parse('content.notifies1.success("Comment saved")');
    })
        .catch(() => {
            dmx.parse('content.notifies1.warning("Comment saved")');
        })

}

function onSubmit() {

    const form = document.querySelector("form");

    var comment = {
        datetime1: form.datetime1.value,
        datetime: form.datetime.value,
        name: form.name.value,
        image: form.url.value,
        message: form.comment.value
    };


    if ('serviceWorker' in navigator && 'SyncManager' in window) {

        navigator.serviceWorker.ready
            .then(function (sw) {

                writeData('sync-comments', comment)
                    .then(function () {
                        console.log("[Sync tag registered]");
                        return sw.sync.register('sync-new-comment');
                    })
                    .then(function () {
                        resetLocalValues(comment);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
    } else {
        sendComments(comment);
    }
}