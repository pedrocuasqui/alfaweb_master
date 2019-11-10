/*jshint esversion:8 */
module.exports = {
	friendlyName: "View login",

	description: 'Display "Login" page.',

	exits: {
		success: {
			viewTemplatePath: "pages/autenticacion/login"
		}
	},

	fn: async function() {
		// Respond with view.
		return {};
	}
};
