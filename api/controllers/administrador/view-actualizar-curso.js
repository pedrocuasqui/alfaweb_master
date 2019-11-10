/*jshint esversion:8 */
module.exports = {
	friendlyName: "View actualizar curso",

	description: 'Display "Actualizar curso" page.',

	inputs: {
		cursoId: {
			type: "string",
			required: true
		}
	},

	exits: {
		success: {
			viewTemplatePath: "pages/administrador/actualizar-curso"
		}
	},

	fn: async function(inputs, exits) {
		// Respond with view.
		var curso = await Curso.find({ id: inputs.cursoId });
		return exits.success({
			curso: curso[0]
		});
	}
};
