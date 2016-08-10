/**
 * Part of mcwebb/angular-cognalys
 * Modified to work with custom Python Flask API endpoint by: Omar Quazi
 * Copyright 2015 Matthew Webb <matthewowebb@gmail.com>
 * Copyright 2015 Omar Quazi <omarquaz@gmail.com>
 * MIT License
 */
angular
  .module('py.cognalys', [])
  .provider('Cognalys', Cognalys);

function Cognalys() {
  var apiEndpoint = 'http://localhost:5000';

  this.$get = function($http, $q) {
    var cache = [],
      deferred = $q.defer();

    return {
      verifyMobileNumber: verifyMobileNumber,
      confirmVerification: confirmVerification
    };

    function verifyMobileNumber(cc, number) {
      cache = [];
      return makeCall(apiEndpoint + "/verify/placeCall/" + (cc + number));
    }

    function confirmVerification(otp_end, pubKey, number) {
      var latest = cache.pop();
      return makeCall(apiEndpoint + "/verify/verifyCall/" + latest.keymatch + "/" + (latest.otp_start + otp_end));
    }

    function makeCall(url) {
      $http
        .get(url)
        .success(fnSuccess)
        .error(fnError);
      return deferred.promise;
    }

    function fnSuccess(data) {
      var error = {};
      data = JSON.parse(data.result);

      if (data.status == 'success') {
        cache.push(data);
        deferred.resolve(data);
      } else {
        error = (typeof data.errors === 'object') ? data.errors : {
          500: 'An unknown error occured'
        };
        deferred.reject(error);
      }
    }

    function fnError(data) {
      deferred.reject({
        500: 'An unknown error occured'
      });
    }
  };
}