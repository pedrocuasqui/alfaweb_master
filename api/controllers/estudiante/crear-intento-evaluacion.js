/*jshint esversion:8 */
module.exports = {
	friendlyName: "Crear intento evaluacion",

	description: "",

	inputs: {
		estudianteId: {
			//el intento pertenece al estudiante
			type: "string",
			required: true
		},
		submoduloId: {
			//la evaluacion esta dentro del modelo Submodulo, por tanto se asocia directamente con el Submodulo
			type: "string",
			required: true
		},
		cursoId: {
			type: "string",
			required: true
		},

		puntos: {
			type: "number",
			required: true
		},
		nivel: {
			type: "number",
			required: true
		},
		medalla: {
			type: "string",
			isIn: ["novato", "estudiante", "graduado", "profesor"],
			required: true
		},
		tiempoMaximoPorPregunta: {
			type: "number",
			required: true
		},
		apruebaEvaluacion: {
			type: "number",

			required: true,
			description:
				"Guarda 1 si la evaluacion tiene mas de la mitad de respuestas acertadas, caso contrario guarda cero, es decir que reprueba la evaluacion "
		},
		evaluacion: {
			//esta evaluacion debe contener los errores en cada pregunta
			type: "json",
			columnName: "evaluacion"
		}
	},

	exits: {
		success: {
			description: "retorna exito"
		}
	},

	fn: async function(inputs, exits) {
		var res = this.res;
		var intentoEvaluacionCreado = null;

		try {
			intentoEvaluacionCreado = await IntentoEvaluacion.create({
				puntos: inputs.puntos,
				nivel: inputs.nivel,
				medalla: inputs.medalla,
				tiempoMaximoPorPregunta: inputs.tiempoMaximoPorPregunta,
				apruebaEvaluacion: inputs.apruebaEvaluacion,
				evaluacion: JSON.parse(inputs.evaluacion),
				curso: inputs.cursoId,
				estudiante: inputs.estudianteId,
				submodulo: inputs.submoduloId
			}).fetch();
		} catch (e) {
			let error = new Error();
			error.code = "NO SE PUDO GUARDAR, ERROR EN EL SERVIDOR";
			error.message = e;
			return res.status(500).send({ error });
		}
		return exits.success({ intentoEvaluacionCreado });
	}
};
