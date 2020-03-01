/*jshint esversion:8 */
module.exports = {
	friendlyName: "View registro",

	description: 'Display "Registro" page.',

	exits: {
		success: {
			viewTemplatePath: "pages/autenticacion/registro-usuario"
		}
	},

	fn: async function(inputs, exits) {
		// sin inputs en este controlador obtengo un resultado de error

		var superAdministradores = await Profesor.find({
			superAdmin: true
		}).sort("createdAt DESC");
		return exits.success({ superAdministradores });
	}
};
