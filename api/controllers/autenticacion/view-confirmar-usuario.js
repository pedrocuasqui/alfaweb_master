/*jshint esversion:8 */
module.exports = {
	friendlyName: "View confirmar usuario",

	description: 'Display "Confirmar usuario" page.',
	inputs: {
		usuarioId: {
			type: "string",
			required: true
		}
	},
	exits: {
		success: {
			viewTemplatePath: "pages/autenticacion/confirmar-usuario"
		}
	},

	fn: async function(inputs) {
		// Respond with view.
		var usuario = null;
		var usuarioEs = null;
		usuario = await Estudiante.findOne({ id: inputs.usuarioId });
		usuarioEs = "Estudiante";
		if (!usuario) {
			usuario = await Profesor.findOne({ id: inputs.usuarioId });
			usuarioEs = "Profesor";
		}

		if (!usuario) {
			//si no se encuentra al usuario
			sails.log("no se encuentra el usuario");
			objetoError.code = 401;
			objetoError.message = "No se encuentra el usuario solicitado";
			return res.status(objetoError.code).send({ error: objetoError });
			// return exits.noAutorizado();
		} else {
			if (usuarioEs == "Estudiante") {
				await Estudiante.update({ id: inputs.usuarioId })
					.set({
						confirmado: true
					})
					.intercept(err => {
						return res.status(409).send({ error: err });
					});
			} else {
				await Profesor.update({ id: inputs.usuarioId })
					.set({
						confirmado: true
					})
					.intercept(err => {
						return res.status(409).send({ error: err });
					});
			}
		}
		return {};
	}
};
