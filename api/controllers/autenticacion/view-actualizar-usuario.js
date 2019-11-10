/*jshint esversion:8 */
module.exports = {
	friendlyName: "View actualizar usuario",

	description: 'Display "Actualizar usuario" page.',

	exits: {
		success: {
			viewTemplatePath: "pages/autenticacion/actualizar-usuario"
		}
	},

	fn: async function() {
		var req = this.req;
		var res = this.res;
		var usuario = null;

		//si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

		if (req.session.userId) {
			// si existe un usuario
			// if (req.session.userId != 1) {// si el usuario no es visitante entonces se busca la información del usuario en la base de datos
			usuario = await Estudiante.findOne({ id: req.session.userId });

			if (!usuario) {
				usuario = await Profesor.findOne({ id: req.session.userId });
			}

			if (!usuario) {
				res
					.status(401)
					.send({ Error: "EL USUARIO NO SE ENCUENTRA EN LA BASE DE DATOS" });
				//respuesta pendiente de modificacion
			}
		}
		return { usuario };
	}
};
