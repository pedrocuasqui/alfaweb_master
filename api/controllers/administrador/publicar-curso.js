/*jshint esversion:8 */
module.exports = {
	friendlyName: "Publicar curso",

	description: "Establece el valor del campo PUBLICADO en true",

	inputs: {
		cursoId: {
			type: "string",
			required: true
		},
		publicar: {
			type: "boolean",
			required: true
		}
	},

	exits: {},

	fn: async function(inputs) {
		var res = this.res;
		var req = this.req;
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

		// var cursoRecibido = JSON.parse(inputs.curso);
		try {
			await Curso.update({
				id: inputs.cursoId
			}).set({
				publicado: inputs.publicar
			});
		} catch (e) {
			if (e.CODE == "E_UNIQUE") {
				return res.status(409).send({ error: e });
			}
			if (e.name == "UsageError") {
				return res.status(400).send({ error: e });
			} else {
				return res.status(500).send({ err: e });
			}
		}

		return res.ok();
	}
};
