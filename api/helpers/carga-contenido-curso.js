/*jshint esversion:8 */

module.exports = {
	friendlyName:
		"Cargar Contenido del curso el contenido del curso desde la base de datos",

	description:
		"Realiza la consulta a la base de datos y retorna el contenido del curso   ",

	inputs: {
		cursoId: {
			description: "The ID of the course to look up.",
			// By declaring a numeric example, Sails will automatically respond with `res.badRequest`
			// if the `cursoId` parameter is not a string.
			type: "string",
			// By making the `cursoId` parameter required, Sails will automatically respond with
			// `res.badRequest` if it's left out.
			required: true
		}
	},

	fn: async function(inputs, exits) {
		var curso = await Curso.find({ id: inputs.cursoId }).populate("modulos");
		let moduloLibro = curso[0].modulos;

		return exits.success(moduloLibro);
	}
};
