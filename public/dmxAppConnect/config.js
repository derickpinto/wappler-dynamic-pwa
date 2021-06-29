dmx.config({
  "index": {
    "repeat1": {
      "meta": null,
      "outputType": "object"
    },
    "query": [
      {
        "type": "array",
        "name": "comments"
      }
    ],
    "localStorage": [
      {
        "type": "object",
        "name": "headers"
      },
      {
        "type": "object",
        "name": "/api/get_data/all_comments?"
      },
      {
        "type": "object",
        "name": "post_comment"
      },
      {
        "type": "object",
        "name": "get_comment"
      }
    ],
    "repeat_on_fail": {
      "meta": [
        {
          "name": "id",
          "type": "text"
        },
        {
          "name": "name",
          "type": "text"
        },
        {
          "name": "message",
          "type": "text"
        },
        {
          "name": "datetime",
          "type": "text"
        },
        {
          "name": "image",
          "type": "text"
        }
      ],
      "outputType": "array"
    },
    "repeat2": {
      "meta": null,
      "outputType": "array"
    },
    "data_store": [
      {
        "type": "text",
        "name": "datetime"
      },
      {
        "type": "text",
        "name": "name"
      },
      {
        "type": "text",
        "name": "url"
      },
      {
        "type": "text",
        "name": "message"
      }
    ],
    "sync_comment": [
      {
        "name": "syncComment",
        "type": "text"
      }
    ],
    "local_storage": {
      "meta": null,
      "outputType": "object"
    }
  },
  "main": {
    "localStorage": [
      {
        "type": "array",
        "name": "new"
      }
    ]
  }
});
