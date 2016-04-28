(function () {
   'use strict';

   var TwitterWidget = CoreLibrary.Component.subclass({
      defaultArgs: {
         twitter: {
            value: '#kambi',
            widget_id: '677852574847008768',
            type: 'related'
         }
      },

      supportedTwitterLocales: ['hi', 'zh-cn', 'fr', 'zh-tw',
         'msa', 'fil', 'fi', 'sv', 'pl', 'ja', 'ko', 'de',
         'it', 'pt', 'es', 'ru', 'id', 'tr', 'da', 'no', 'nl', 'hu', 'fa', 'ar', 'ur', 'he', 'th'],

      constructor () {
         CoreLibrary.Component.apply(this, arguments);
      },

      init () {
         this.scope.widgetTitle = '';
         setTimeout(() => {
            if (window.twttr && this.scope.args.twitter && this.scope.args.twitter.type) {
               var twitterParams = {
                  width: '100%',
                  height: 500, // TODO $scope.currentHeight - 34,
                  chrome: 'noheader noborders transparent'
               },
               locale = CoreLibrary.config.clientConfig.locale.substring(0, 2);

               Object.keys(this.scope.args.twitter).forEach((key) => {
                  twitterParams[key] = this.scope.args.twitter[key];
               });

               twitterParams[this.scope.args.twitter.type] =
                  this.scope.args.twitter.value ? encodeURIComponent(this.scope.args.twitter.value) : '';

               // Match the locale string against supported languages provided by twitter
               if (locale && this.supportedTwitterLocales.indexOf(locale) !== -1) {
                  twitterParams.lang = locale;
               } else {
                  twitterParams.lang = 'en';
               }

               if (this.scope.args.twitter.type.match('screen')) {
                  this.scope.widgetTitle = '@' + this.scope.args.twitter.value;
               } else {
                  this.scope.widgetTitle = this.scope.args.twitter.value;
               }

               window.twttr.widgets.createTimeline(
                  twitterParams.widget_id,
                  document.getElementById('timeline_twitter'),
                  twitterParams
               ).then(function (el) {
               });
            }
         }, 100);
      }
   });

   var twitterWidget = new TwitterWidget({
      rootElement: 'html'
   });
})();
