(function () {
   'use strict';

   var TwitterWidget = CoreLibrary.Component.subclass({
      defaultArgs: {
         value: '#kambi',
         widget_id: '677852574847008768',
         type: 'related'
      },

      supportedTwitterLocales: ['hi', 'zh-cn', 'fr', 'zh-tw',
         'msa', 'fil', 'fi', 'sv', 'pl', 'ja', 'ko', 'de',
         'it', 'pt', 'es', 'ru', 'id', 'tr', 'da', 'no', 'nl', 'hu', 'fa', 'ar', 'ur', 'he', 'th'],

      constructor () {
         CoreLibrary.Component.apply(this, arguments);
      },

      init () {
         var widgetHeight = 450;
         CoreLibrary.widgetModule.setWidgetHeight(widgetHeight);
         this.scope.widgetTitle = '';
         setTimeout(() => {
            if (window.twttr && this.scope.args.type) {
               var twitterParams = {
                  width: '100%',
                  height: widgetHeight - 37,
                  chrome: 'noheader noborders transparent'
               },
               locale = CoreLibrary.config.locale.substring(0, 2);

               Object.keys(this.scope.args).forEach((key) => {
                  twitterParams[key] = this.scope.args[key];
               });

               twitterParams[this.scope.args.type] =
                  this.scope.args.value ? encodeURIComponent(this.scope.args.value) : '';

               // Match the locale string against supported languages provided by twitter
               if (locale && this.supportedTwitterLocales.indexOf(locale) !== -1) {
                  twitterParams.lang = locale;
               } else {
                  twitterParams.lang = 'en';
               }

               if (this.scope.args.type.match('screen')) {
                  this.scope.widgetTitle = '@' + this.scope.args.value;
               } else {
                  this.scope.widgetTitle = this.scope.args.value;
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
