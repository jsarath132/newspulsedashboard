(function () {
  'use strict';

  angular
    .module('core')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state','$location', '$http','Authentication'];

  function LoginController($state, $location, $http, Authentication) {
    var vm = this;
    vm.submitted = false;
    vm.login = Login;
    vm.authentication = Authentication;

    (function initController() {
        // reset login status
        Logout();
    })();

  	function Login(isValid) {
  		vm.submitted = true;
  		if(isValid) {
  			vm.dataLoading = true;
	        $http.post('/api/auth/signin', 
	        	{ username: vm.username, password: vm.password }
	        	).success(function (response) {
	          // If successful we assign the response to the global user model
	          vm.authentication.user = response;
	          // And redirect to the previous or home page
	          // vm.dataLoading = false;
	          $state.go($state.previous.state.name || 'home', $state.previous.params);
	        }).error(function (response) {
	          vm.error = response.message;
	          vm.dataLoading = false;
	        });
	    }
      }

      function Logout() {
        // remove user from local storage and clear http auth header
        vm.authentication.user = null;
      }

    // function login(isValid) {
    //     vm.dataLoading = true;
    //     vm.error = '';
    //     vm.submitted = true;
    //     if(isValid) {
    //         Authentication.Login(vm.username, vm.password);
    //         vm.dataLoading = false;
    //     } else {
    //         vm.dataLoading = false;
    //     }
    // };
  }
}());
