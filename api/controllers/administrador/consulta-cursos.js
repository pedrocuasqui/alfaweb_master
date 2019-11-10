/*jshint esversion: 8 */
module.exports = {
	friendlyName: "Consulta cursos",

	description:
		"busca en la base de datos todos los documentos de la base de la coleccion CURSO",

	inputs: {},

	exits: {},

	fn: async function() {
		var cursos = await Curso.find({});
		return cursos;
	}
};
