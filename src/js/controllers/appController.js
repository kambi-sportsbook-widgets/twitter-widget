(function () {

   'use strict';

   function appController( $scope, $widgetService, $apiService, $controller, $timeout ) {

      // Extend the core controller that takes care of basic setup and common functions
      angular.extend(appController, $controller('widgetCoreController', {
         '$scope': $scope
      }));

      $scope.defaultHeight = 450;

      /**
       * setTimeline
       * Parse timeline configuration and init the twitter framework
       */
      var setTimeline = function () {

         $timeout(function () {
            $scope.$apply();

            if ( twttr ) {
               var twitterParams = {
                  width: '100%',
                  height: $scope.currentHeight - 50,
                  chrome: 'noheader noborders transparent'
               };
               twitterParams = angular.merge(twitterParams, $scope.args.twitter);
               twitterParams[$scope.args.twitter.type] = $scope.args.twitter.value ? encodeURIComponent($scope.args.twitter.value) : '';

               twttr.widgets.createTimeline(
                  twitterParams.widget_id,
                  document.getElementById('timeline_twitter'),
                  twitterParams
               ).then(function (el) {

               });
            }
         }, 100);
      };

      // Call the init method in the coreWidgetController so that we setup everything using our overridden values
      // The init-method returns a promise that resolves when all of the configurations are set, for instance the $scope.args variables
      // so we can call our methods that require parameters from the widget settings after the init method is called
      $scope.init().then(function () {

         /**
          * Default twitter object configuration.
          * Possible values for @type : related | screenName | userId | favoritesScreenName | favoritesUserId
          * @type {{value: string, widget_id: string, type: string}}
          */
         $scope.args.twitter = {
            value: '#manchester united',
            widget_id: '676378780357763072',
            type: 'related'
         };

         setTimeline();
      });

   }

   (function ( $app ) {
      return $app.controller('appController', ['$scope', 'kambiWidgetService', 'kambiAPIService', '$controller', '$timeout', appController]);
   })(angular.module('twitterWidget'));

}).call(this);
