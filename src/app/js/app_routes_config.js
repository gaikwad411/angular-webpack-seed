// Routes config
function registerRoutes (webApp) {
	webApp.config(['$stateProvider', '$urlRouterProvider', 
		function($stateProvider, $urlRouterProvider){
		
		
		// require test tpl
		var testPartialTpl = require('../partials/test.tpl.jade');


		// Inventory Planning
		$stateProvider.state('dashboard', {
			url: '/dashboard',
			template: testPartialTpl,// @todo set it to template URL//'<h1>Test View Done</h1>',
			controller: function($scope){
				
			}
		});
		
		
		// Default route
		$urlRouterProvider.otherwise('/dashboard');

		
	}]);

};


// Exports
module.exports = {
	registerRoutes: registerRoutes
}