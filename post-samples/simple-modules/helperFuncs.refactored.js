define('getUrlVars', function(){
	return function getUrlVars() {
		return location.search.replace(/^\?/, '')
			.split('&').map(function(x){ return x.split('=') })
			.reduce(function(obj, x){obj[x[0]] = decodeURIComponent(x[1]); return obj; }, {})
	}
})
window.getUrlVars = require('getUrlVars');

define('showDialog', function(){
	var $ = require('jquery');
	
	return function showDialog(text) {
	   	return $('<div>').text(text).dialog();
	}
});
window.showDialog = require('showDialog');