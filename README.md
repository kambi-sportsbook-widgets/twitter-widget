# twitter-widget
A twitter widget to display tweets based on configuration

## Configuration example:

__`client-widgets.js`__

```json

...
{
    "order": 1,
    "widgetId": "Twitter Manchester feed",
    "args": {
        "twitter": {
            "value": "premierleague",
            "widget_id": "677852574847008768",
            "type": "screen"
        }
    }
},
...

```

### The configuration object must contain the key 'twitter', which in turn must hold the following keys, values:
1. `type` sets the type of timeline:
    - `related` can be one or more hashtag(s), eg: `#manchester`, `#manchester #premierleague`
    - `screenName` a certain user name which will display his tweets
    - `favoritesScreenName` a certain user name which will display his tweets
2. `value` sets the search word or name or user id set in the `type` parameter
3. `widget_id` is the widget id, which can be found on https://twitter.com/settings/widgets for a registered developer which has created a timeline widget.

The widget can take any parameter found in Twitter's Timeline parameters https://dev.twitter.com/web/embedded-timelines/parameters

### This widget has as default the following attributes:
 - width: '100%',
 - height: widget's current height minus 50,
 - chrome: 'noheader noborders transparent'

For more information on timeline widgets, refer to https://dev.twitter.com/web/embedded-timelines

# Changelog

changelog can be found [here](CHANGELOG.md)
