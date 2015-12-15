(function () {

   var arrDependencies;

   arrDependencies = [
      'widgetCore'
   ];

   (function ( $app ) {
      'use strict';
      return $app;
   })(angular.module('twitterWidget', arrDependencies));
}).call(this);



(function () {

   'use strict';

   function appController( $scope, $controller, $timeout ) {

      // Extend the core controller that takes care of basic setup and common functions
      angular.extend(appController, $controller('widgetCoreController', {
         '$scope': $scope
      }));

      $scope.defaultHeight = 450;

      var supported_twitter_langs = ['hi', 'zh-cn', 'fr', 'zh-tw',
         'msa', 'fil', 'fi', 'sv', 'pl', 'ja', 'ko', 'de',
         'it', 'pt', 'es', 'ru', 'id', 'tr', 'da', 'no', 'nl', 'hu', 'fa', 'ar', 'ur', 'he', 'th'];

      /**
       * setTimeline
       * Parse timeline configuration and init the twitter framework
       */
      var setTimeline = function () {

         $timeout(function () {
            $scope.$apply();

            if ( twttr && $scope.args.twitter && $scope.args.twitter.type ) {
               var twitterParams = {
                  width: '100%',
                  height: $scope.currentHeight - 50,
                  chrome: 'noheader noborders transparent'
               };

               twitterParams = angular.merge(twitterParams, $scope.args.twitter);
               twitterParams[$scope.args.twitter.type] = $scope.args.twitter.value ? encodeURIComponent($scope.args.twitter.value) : '';

               if ( $scope.args.twitter.lang && supported_twitter_langs.indexOf($scope.args.twitter.lang) !== -1 ) {
                  twitterParams.lang = $scope.args.twitter.lang;
               } else {
                  twitterParams.lang = 'en';
               }

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
      return $app.controller('appController', ['$scope', '$controller', '$timeout', appController]);
   })(angular.module('twitterWidget'));

}).call(this);
