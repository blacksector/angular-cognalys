/*
 * Part of mcwebb/angular-cognalys
 * Modified to work with custom Python Flask API endpoint by: Omar Quazi
 * Copyright 2015 Matthew Webb <matthewowebb@gmail.com>
 * Copyright 2015 Omar Quazi <omarquaz@gmail.com>
 * MIT License
 */
angular.module('py.cognalys', [])
.provider('Cognalys', function () {
	var apiEndpoint = 'http://localhost:5000';

	this.$get = function ($http, $q) {
		var cache = [];
		return {
			verifyMobileNumber: function (cc, number) {
				cache = [];
				var q = $q.defer();
				$http.get(apiEndpoint+"/verify/placeCall/"+(cc+number))
				.success(function (data) {
					data = JSON.parse(data.result);
					if (data.status == 'success') {
						cache.push(data);
						q.resolve(data);
					} else {
						if (typeof data.errors === 'object')
							q.reject(data.errors);
						else q.reject({
							500: 'An unknown error occured'
						});
					}
				})

				.error(function () {
					q.reject({
						500: 'An unknown error occured'
					});
				});
				return q.promise;
			},
			confirmVerification: function (otp_end, pubKey, number) {
				var q = $q.defer(),
					latest = cache.pop();
				$http.get(apiEndpoint+"/verify/verifyCall/"+latest.keymatch+"/"+(latest.otp_start+otp_end))
				.success(function (data) {
					data = JSON.parse(data.result);
					if (data.status == 'success') {
						cache.push(data);
						q.resolve(data);
					} else {
						if (typeof data.errors === 'object')
							q.reject(data.errors);
						else q.reject({
							500: 'An unknown error occured'
						});
					}
				})
				.error(function () {
					q.reject({
						500: 'An unknown error occured'
					});
				});
				return q.promise;
			}
		};
	};
});
