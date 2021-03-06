(function (angular) {

  'use strict';

  var angularTrackJs = angular.module('trackJs', []);

  angularTrackJs.config(function ($provide) {
    $provide.decorator("$exceptionHandler", function ($delegate, exceptionHandlerDecorator) {
      return exceptionHandlerDecorator.decorate($delegate);
    });
  });

  angularTrackJs.factory('exceptionHandlerDecorator', function ($window) {
    var decorate = function ($delegate) {
      return function (exception, cause) {
        if ($window.trackJs) {
          $window.trackJs.track(exception);
        }

        $delegate(exception, cause);
      };
    };

    return {
      decorate: decorate
    };
  });

  angularTrackJs.factory('trackJs', function ($window) {
    return {
      track: function (message) {
        $window.trackJs.track(message);
      },

      configure: function (options) {
        if (options && $window.trackJs) {
          $window.trackJs.configure(options);
        }
      }
    };
  });


  angularTrackJs.provider('TrackJs', function () {
    this.configure = function (options) {
      if (options && window.trackJs) {
        window.trackJs.configure(options);
      }
    };

    this.$get = angular.noop;
  });
})
(angular);
