(function () {

   'use strict';

   function appController( $scope, $widgetService, $apiService, $controller, $timeout ) {

      // Extend the core controller that takes care of basic setup and common functions
      angular.extend(appController, $controller('widgetCoreController', {
         '$scope': $scope
      }));

      $scope.defaultHeight = 450;

      $scope.twitter_timeline = {};

      /**
       * timeline configuration.
       * parameter is the url parameter used in widget href. In case of user timeline, the value should be the users id.
       * For search timeline, possible searches :
       *    - #TwitterStories (hashtagsearch)
       *    - manchester (string search)
       *    - @twitterApi (mentions search)
       * More at https://dev.twitter.com/web/embedded-timelines/search
       * @type Object
       */
      var timeline = {
         search: {
            parameter: 'search?q=', //
            value: '%23manchester%20united',
            widget_id: '676378780357763072'
         },
         user: {
            parameter: '',
            value: false,
            widget_id: 676406893443686401
         }
      };

      /**
       * setTimeline
       * Parse timeline configuration and init the twitter framework
       */
      var setTimeline = function () {
         // Return the first enabled timeline
         for ( var twitterItem in timeline ) {
            if ( timeline[twitterItem].value !== false ) {
               $scope.twitter_timeline = timeline[twitterItem];
               $scope.twitter_timeline.height = $scope.currentHeight - 50;
               break;
            }
         }

         $timeout(function () {
            $scope.$apply();

            if ( twttr ) {
               // Force twitter bootstrap the widget
               twttr.widgets.load(
                  document.getElementById("timeline_twitter")
               );
            }
         }, 100);
      };

      // Call the init method in the coreWidgetController so that we setup everything using our overridden values
      // The init-method returns a promise that resolves when all of the configurations are set, for instance the $scope.args variables
      // so we can call our methods that require parameters from the widget settings after the init method is called
      $scope.init().then(function () {
         setTimeline();
      });

   }

   (function ( $app ) {
      return $app.controller('appController', ['$scope', 'kambiWidgetService', 'kambiAPIService', '$controller', '$timeout', appController]);
   })(angular.module('twitterWidget'));

}).call(this);
