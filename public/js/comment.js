var form = document.querySelector("form");

function resetLocalValues(newComment) {
    var oldComments = dmx.parse("content.index_local.data.get_comment");

    if (!oldComments) {
        return;
    }

    var lastComment = oldComments[0];

    if (lastComment) {
        newComment["id"] = lastComment["id"] + 1;
    } else {
        newComment["id"] = 1;
    }

    var newArray = [newComment].concat(oldComments);

    dmx.parse(
        'content.index_local.set("get_comment",' + JSON.stringify(newArray) + ")"
    );
}

function postDataFromPage(payload) {
    const url = "/api/post_data/post_new_comment";
    const parameters = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    };

    fetch(url, parameters).catch(() => {
        console.log("Unable post the comment");
    });
}

function onFailure() {
    var payload = {
        datetime1: form.datetime1.value,
        datetime: form.datetime.value,
        name: form.name.value,
        image: form.url.value,
        message: form.comment.value,
    };


    if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready
            .then(function (reg) {
                writeData("sync-comments", payload).then(() => {
                    return reg.sync.register("post-comment");
                });
            })
            .catch(function () {
                postDataFromPage(payload);
            });
    } else {
        postDataFromPage(payload);
    }
}
