/*jshint esversion: 8 */
module.exports = {
	friendlyName: "Consulta cursos",

	description:
		"busca en la base de datos todos los documentos de la base de la coleccion CURSO",

	inputs: {},

	exits: {},

	fn: async function() {
		var res = this.res;
		var req = this.req;
		var usuario = null;
		var cursoInforBasica = null;
		var cursos = null;

		if (!req.session.userId) {
			//no está logueado
			return res.forbidden();
		} else {
			usuario = await Profesor.findOne({ id: req.session.userId }); // deberá encontrar un Profesor
			if (!usuario) {
				return res.forbidden();
			}
			if (usuario.administrador) {
				//busqueda del curso alfaweb para todos los administradores
				cursoInforBasica = await Curso.findOne({
					nombre: "Alfabetización informática",
				});

				cursos = await Curso.find({ profesor: usuario.id }); //devuelve un arreglo con los cursos encotrados que pertenecen al profesor
				// aniade el curso de informatica basica al arreglo de cursos
				cursos.unshift(cursoInforBasica);
			} else {
				cursos = await Curso.find({});
			}

			// se retorna la lista de cursos
			return cursos;
		}
	},
};
