/*jshint esversion: 8 */
module.exports = {
	friendlyName: "Actualizar submodulo",

	description: "",

	inputs: {
		nombreSubmodulo: {
			type: "string",
			required: true
		},
		descripcionSubmodulo: {
			type: "string",
			required: true
		},

		contenidoTiny: {
			type: "string",
			required: false
		},
		submoduloId: {
			type: "string",
			required: true
		},
		color: {
			type: "string",
			required: false
		},
		evaluacion: {
			type: "json"
		}
	},

	exits: {},

	fn: async function(inputs) {
		var res = this.res;
		// var cursoRecibido = JSON.parse(inputs.curso);
		try {
			await SubmoduloLibro.update({
				id: inputs.submoduloId
			}).set({
				nombreSubmodulo: inputs.nombreSubmodulo,
				descripcion: inputs.descripcionSubmodulo,
				contenidoTiny: inputs.contenidoTiny,
				color: inputs.color,
				evaluacion: inputs.evaluacion
			});
		} catch (e) {
			sails.log(
				"Error al intentar actualizar el submodulo:" +
					inputs.nombreSubmodulo +
					"\n" +
					e
			);
			if (e.CODE == "E_UNIQUE") {
				return res.status(409).send({ error: e });
			}
			if (e.name == "UsageError") {
				return res.status(400).send({ error: e });
			} else {
				return res.status(500).send({ err: e });
			}
		}
		return; // no remitir ningun codigo porque da error
	}
};
