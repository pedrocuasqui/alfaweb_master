/* eslint-disable camelcase */
/*jshint esversion:8 */
module.exports = {
	friendlyName: "View indice estudiante",

	description: 'Display "Indice estudiante" page.',

	inputs: {
		// usuarioId: { //el usuario ya no es necesario porque se usa el valor de req.session.userId
		//   type: 'string',
		//   required: true
		// },
		cursoId: {
			type: "string",
			required: true
		}
	},

	exits: {
		success: {
			viewTemplatePath: "pages/estudiante/indice-estudiante"
		},
		serverError: {
			statusCode: 400,
			description: "El usuario ha sido eliminado de la base de datos"
		}
	},

	fn: async function(inputs, exits) {
		var req = this.req;
		var res = this.res;
		//solo para pruebas se usa la Colecion estudiante
		var usuario = { nombre: "Visitante", rol: "Estudiante", id: "1" };
		var cursoEstudiante = null;
		var navegarAtras = "/inicio";
		var navegarSiguiente = "";
		var numeroSubmodulosCurso = 0; //sirve para enviar en el usuario y comprobar el porcentaje de evaluaciones realizadas de todo el curso

		var intentoEvaluacion = {
			//intento por defecto se usa para los usuario no logueados o usuarios logueados por primera vez que aún no tienen interaccion con el aplicativo
			puntos: 0,
			nivel: 1, //modulo 1
			medalla: "bebe", //medalla mas basica
			tiempoMaximoPorPregunta: 30, //en segundos por defecto
			evaluacion: null
		};

		//Evaluación si existe usuario logueado
		if (req.session.userId) {
			//CUANDO EXPIRA LA SESION YA NO INGRESA AQUI

			usuario = await Estudiante.findOne({ id: req.session.userId });
			if (!usuario) {
				// res.status(401).send({ 'Error': 'SU SESIÓN HA EXPIRADO' });
				res.status(401).send({ error: "NO SE ENCUENTRA EL USUARIO" });
			}

			//se busca el avance en el curso solicitado para mostrar en el indice
			cursoEstudiante = await CursoEstudiantes.findOne({
				curso_matriculados: inputs.cursoId,
				estudiante_cursos: usuario.id
			});
			if (cursoEstudiante) {
				if (cursoEstudiante.avance) {
					var ultimoTema = null; //para almacenar el nombre del ultimo tema
					if (cursoEstudiante.avance.enlace) {
						//es alfaweb, entonces busco por enlace

						ultimoTema = await ModuloLibro.findOne({
							enlace: cursoEstudiante.avance.enlace
						});
						if (!ultimoTema) {
							ultimoTema = await SubmoduloLibro.findOne({
								enlace: cursoEstudiante.avance.enlace
							});
						}
					} else {
						// es otro curso , entonces busco por id

						ultimoTema = await ModuloLibro.findOne({
							id: cursoEstudiante.avance.objetoId
						});
						if (!ultimoTema) {
							ultimoTema = await SubmoduloLibro.findOne({
								id: cursoEstudiante.avance.objetoId
							});
						}
					}
					//si el utlimo tema es un modulo
					if (ultimoTema.nombreModulo) {
						cursoEstudiante.nombre = ultimoTema.nombreModulo;
					} else {
						cursoEstudiante.nombre = ultimoTema.nombreSubmodulo;
					}
				}
			}
		}

		// var curso = await Curso.findOne({ id: inputs.cursoId }).populate('modulos');
		var curso = await sails.helpers
			.solicitarCursoCompleto(inputs.cursoId)
			.intercept(err => {
				sails.log("ERROR EN HELPERS: " + err);
			});
		// se aniade el enlace a si mismo para poder usar en el breadcrubm
		curso.enlace = "/indice-estudiante/?cursoId=" + curso.id;
		var contenidos = curso.modulos;
		if (curso.modulos.length != 0) {
			if (curso.nombre == "Alfabetización informática") {
				navegarSiguiente = "/contenido-alfaweb/?enlace=m1-computadora";
			} else {
				navegarSiguiente =
					"/interfaz-modulos/?objetoId=" +
					curso.modulos[0].id +
					"&tipoContenido=Modulo";
			}

			//Conteo del numero de submodulos del mismo curso
			curso.modulos.forEach(modulo => {
				// eslint-disable-next-line no-unused-vars
				modulo.submodulos.forEach(submodulo => {
					numeroSubmodulosCurso += 1;
				});
			});
		} else {
			navegarSiguiente = "/indice-estudiante/?cursoId=" + curso.id;
		}

		//siempre se aniade un intento evaluacion al usuario
		usuario.ultimoIntento = intentoEvaluacion;
		usuario.numeroSubmodulosCurso = numeroSubmodulosCurso;
		usuario.submodulosAprobadosPorCurso = [];
		if (usuario.nombre != "Visitante") {
			//si existe un usuario logueado tipo estudiante
			//se buscan los documentos que contengan al id de usuario logueado y el submodulo seleccionado
			let intentoEv = null;
			intentoEv = await IntentoEvaluacion.find({
				estudiante: usuario.id,
				curso: inputs.cursoId
			}).sort("createdAt DESC");

			if (intentoEv.length > 0) {
				//existe un intento evaluacion entonces se reemplaza el valor de usuario.ultimoIntento
				usuario.ultimoIntento = intentoEv[0]; //escogemos el elemento mas reciente para tomar los puntos y el nivel, no es necesario que haya aprobado la 'ultima evaluacion
			} //caso contrario se mantiene el valor por defecto => null

			var datastoreSails = sails.getDatastore().manager;
			//buscar en intentoEvaluacion las evaluaciones en cada modulo que pertenecen al curso solicitado y que han sido aprobadas esto para saber cuantos submodulos ha aprobado realmente
			let ObjectId = require("mongodb").ObjectID;
			let estudianteObjectId = ObjectId(usuario.id);
			await datastoreSails
				.collection("IntentoEvaluacion")
				.distinct("submodulo", {
					curso: curso.id,
					estudiante: estudianteObjectId,
					apruebaEvaluacion: 1
				})
				.then(respuesta => {
					//estudiante: usuario.id,
					//respuesta contiene un arreglo con el codigo de submodulo por cada intento aprobado
					respuesta.forEach(elemento => {
						usuario.submodulosAprobadosPorCurso.push(elemento.toString());
					});
				});
		}

		return exits.success({
			contenidos,
			usuario,
			curso,
			cursoEstudiante,
			navegarAtras,
			navegarSiguiente
			// cuando el nombre de la propiedad es igual al nombre del objeto que contiene la información, es posible enviar solo un dato es decir que, pasar, contenidos: contenidos es igual que pasar contenidos
		});
	}
};
