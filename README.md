# Angular Cognalys Module
A simple Angular wrapper around the Cognalys REST API with a Python Flask API server

The only methods currently supported are for the phone number validation flow. But that's probably all anyone actually wants right?

## Installation - Angular
### Install with Bower
```bash
# from the terminal at the root of your project
bower install angular-cognalys-python --save
```
### Add to your module deps
```js
angular.module('xxxx', ['py.cognalys'])
```
### Setup server endpoint
Please modify the "apiEndpoint" variable in angular-cognalys.js file with your server endpoint:
```
var apiEndpoint = 'http://localhost:5000';
```

## Example Use
### Try Number
```js
angular
    .module('xxxx')
    .controller('SignupController', SignupController);

SignupController.$inject = ['$scope'];

function SignupController($scope, Cognalys) {
	$scope.submit = function () {
		Cognalys.verifyMobileNumber($scope.countryCode, $scope.phoneNumber)
		.then(function (response) {
			// Success - do something
		}, function (errors) {
			// Failure - do something with the errors
			for (var key in errors) {
				console.log('error code:' + key);
				console.log('error message:' + errors[key]);
			}
		});
	};
}
```
### Verify User's Verification
```js
angular
    .module('xxxx')
    .controller('SignupController', SignupController);

SignupController.$inject = ['$scope'];

function SignupController($scope, Cognalys) {
	$scope.verify = function () {
		Cognalys.confirmVerification($scope.verificationCode)
		.then(function (response) {
			// Success - do something
			console.log("Ok Call Placed!");
		}, function (errors) {
			// Failure - do something with the errors
			for (var key in errors) {
				console.log('error code:' + key);
				console.log('error message:' + errors[key]);
			}
		});
	};
}
```

## Installation - Server (Python Flask)


### Setup required modules
In your command line using pip install the following modules:
```
pip install Flask
pip install -U flask-cors
pip install phonenumbers
```


### Setup variables
Replace the Python variables with your app id and access token:
```python
appId = "APP ID HERE"
accessToken = "ACCESS TOKEN HERE"
```
