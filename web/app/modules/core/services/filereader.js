'use strict';
export function mhFileReader($q, $window) {"ngInject";
    // Wrap the onLoad event in the promise
    var onLoad = function(reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.resolve(reader.result);
        });
      };
    };

    // Wrap the onLoad event in the promise
    var onError = function (reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.reject(reader.result);
        });
      };
    };

    // Wrap the onProgress event by broadcasting an event
    var onProgress = function(reader, scope) {
      return function (event) {
        scope.$broadcast('fileProgress', {
          total: event.total,
          loaded: event.loaded
        });
      };
    };

    // Instantiate a new Filereader with the wrapped properties
    var getReader = function(deferred, scope) {
      var reader = new $window.FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(reader, scope);
      return reader;
    };

    // Read a file as a data url
    var readAsDataURL = function (file, scope) {
      var deferred = $q.defer();

      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);

      return deferred.promise;
    };

    // Read a file as a text
    var readAsText = function(file, encoding, scope) {
      var deferred = $q.defer();

      var reader = getReader(deferred, scope);
      reader.readAsText(file, encoding);

      return deferred.promise;
    };

    return {
      readAsDataURL: readAsDataURL,
      readAsText: readAsText
    };
}