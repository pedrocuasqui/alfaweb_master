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
		var req = this.req;
		var res = this.res;
		var usuario = null;
		//si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

		if (req.session.userId) {
			usuario = await Profesor.findOne({ id: req.session.userId });
			if (!usuario) {
				return res.forbidden();
			} else if (!usuario.confirmado) {
				// si existe un usuario pero no esta confirmado se retorna forbidden
				return res.forbidden();
			}
		} else {
			return res.forbidden();
		}

		// Respond with view.
		var curso = await Curso.find({ id: inputs.cursoId });
		return exits.success({
			curso: curso[0]
		});
	}
};
