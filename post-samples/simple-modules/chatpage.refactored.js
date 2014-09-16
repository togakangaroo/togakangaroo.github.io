define('initializeCommunications', function(){
	var AwesomeCommunicationsLibrary = require('AwesomeCommunicationsLibrary');
	var $ = require('jquery');

	var $username = $('#my-username');

	return function initializeCommunications(config) {
		var communicationsLib = new AwesomeCommunicationsLibrary(config);
		$username.on('blur', resetUsername);
		resetUsername();

		function resetUsername(){
			communicationsLib.setUsername( $username.val() );
		}
	}
})