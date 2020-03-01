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
		return {};
	}
};
