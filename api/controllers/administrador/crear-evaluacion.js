/*jshint esversion: 8 */
module.exports = {
	friendlyName: "Crear evaluacion",

	description: "actualiza el submodulo para aniadir una evaluacion",

	inputs: {
		objetoId: {
			type: "string",
			required: true
		},
		evaluacion: {
			type: "json",
			required: true
		}
	},

	exits: {
		success: {
			description: "se guarda exitosamente la evaluacion"
		}
	},

	fn: async function(inputs) {
		var evaluacionSubmodulo = null;
		// no evalua si esta o no logueado el usuario

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
		try {
			evaluacionSubmodulo = await SubmoduloLibro.update({
				id: inputs.objetoId
			})
				.set({
					evaluacion: JSON.parse(inputs.evaluacion)
				})
				.fetch();
		} catch (e) {
			return res
				.status(500)
				.send({ error: new Error("no se puede guardar" + e) });
		}

		return res.status(200).send({ evaluacionSubmodulo });
	}
};
