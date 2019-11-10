/*jshint esversion:8 */
module.exports = {
	friendlyName: "View crear evaluacion",

	description: 'Display "Crear evaluacion" page.',

	exits: {
		success: {
			viewTemplatePath: "pages/administrador/crear-evaluacion"
		}
	},

	fn: async function() {
		// Respond with view.
		return {};
	}
};
