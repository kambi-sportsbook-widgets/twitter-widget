(function () {

   var arrDependencies;

   arrDependencies = [
      'widgetCore',
      'widgetCore.translate'
   ];

   (function ($app) {
      'use strict';
      return $app;
   })(angular.module('twitterWidget', arrDependencies));
}).call(this);
