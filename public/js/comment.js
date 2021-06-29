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

function onFormSubmitError() {

    if ('serviceWorker' in navigator && 'SyncManager' in window) {

        navigator.serviceWorker.ready
            .then((sw) => {

                const form = document.querySelector("form");

                var comment = {
                    datetime1: form.datetime1.value,
                    datetime: form.datetime.value,
                    name: form.name.value,
                    image: form.url.value,
                    message: form.comment.value
                };

                resetLocalValues(comment);

                writeData('sync-comments', comment)
                    .then(function () {
                        return sw.sync.register('sync-new-comment');
                    })
                    .catch(function (err) {
                        console.log(err);
                        return;
                    });
            });

    }

}