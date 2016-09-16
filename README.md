# twitter-widget

![](https://github.com/kambi-sportsbook-widgets/twitter-widget/blob/master/screenshot.jpg?raw=true)

A widget that shows an embedded twitter feed.

This is a C-widget that means that it is not provided by Kambi directly, instead the operators that want to use this need to build and host the widget themselves. Please see Build Instructions.

## Configuration

Arguments and default values:
```json
"args": {
    "value": "#kambi",
    "widget_id": "677852574847008768",
    "type": "related"
}
```

1. value - string - twitter query
2. widget_id - string - widget id to use
3. type - string - "related", "screen", "likes", "collection", "profile", "url", "widget",

See [this](https://dev.twitter.com/web/javascript/creating-widgets#create-timeline) for more options.

### Build Instructions

Please refer to the [core-library](https://github.com/kambi-sportsbook-widgets/widget-core-library)
