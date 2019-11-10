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
		var res = this.res;
		var evaluacionSubmodulo = null;
		// no evalua si esta o no logueado el usuario
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
