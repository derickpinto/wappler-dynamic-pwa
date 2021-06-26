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
        "type": "array",
        "name": "data"
      },
      {
        "type": "object",
        "name": "headers"
      },
      {
        "type": "object",
        "name": "/api/get_data/all_comments?"
      },
      {
        "type": "array",
        "name": "post_comment"
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
