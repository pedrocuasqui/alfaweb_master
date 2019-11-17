/**
 * `tasks/register/syncAssets.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/sync-assets.js
 *
 */
//REVISADO PARA MODIFICAR sync.js

module.exports = function(grunt) {
	grunt.registerTask("syncAssets", [
		"jst:dev",
		"less:dev",
		"sync:dev",
		"coffee:dev",
		"browserify",
	]);
};
