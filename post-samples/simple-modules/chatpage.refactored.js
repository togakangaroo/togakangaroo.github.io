define('initializeCommunications', function(){
	var AwesomeCommunicationsLibrary = require('AwesomeCommunicationsLibrary');
	var $ = require('jquery');

	var $username = $('#my-username');

	return function initializeCommunications(apiKey) {
		var communicationsLib = new AwesomeCommunicationsLibrary(apiKey);
		$username.on('blur', resetUsername);
		resetUsername();

		function resetUsername(){
			communicationsLib.setUsername( $username.val() );
		}
	}
})
