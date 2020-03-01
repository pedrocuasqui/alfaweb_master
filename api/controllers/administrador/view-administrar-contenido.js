/*jshint esversion:8 */
module.exports = {
	friendlyName: "View administrar contenido",

	description: 'Display "Administrar contenido" page.',

	inputs: {
		objetoId: {
			type: "string",
			required: true
		},
		tipoContenido: {
			type: "string",
			required: true
		}
	},

	exits: {
		success: {
			viewTemplatePath: "pages/administrador/administrar-contenido"
		},
		redirect: {
			description: "Redirecciona a la página indicada",
			responseType: "redirect" // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
			//ejemplos: responseType:'ok'  responseType:'view'
		}
	},

	fn: async function(inputs, exits) {
		var objetoSeleccionado;
		var curso = Object;

		var req = this.req;
		var res = this.res;

		var usuario = null;
		//si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

		var navegarAtras = "";
		var navegarSiguiente = "";

		//si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

		if (req.session.userId) {
			usuario = await Profesor.findOne({ id: req.session.userId });
			if (!usuario) {
				// res.status(404).send({ mensaje: 'Necesita permisos de Administrador' })
				return res.forbidden();
			} else if (!usuario.confirmado) {
				return res.forbidden();
			}
		} else {
			// res.status(404).send({ mensaje: 'Necesita permisos de Administrador' })
			return res.forbidden();
		}

		if (inputs.tipoContenido == "Modulo") {
			objetoSeleccionado = await ModuloLibro.findOne({ id: inputs.objetoId });
			curso = await sails.helpers
				.solicitarCursoCompleto(inputs.objetoId)
				.intercept(err => {
					sails.log("ERROR EN HELPERS: " + err);
				});
			//la propiedad nombre sirve para identificar indistintamente si es modulo o submodulo
			objetoSeleccionado.nombre = objetoSeleccionado.nombreModulo;
		} else if (inputs.tipoContenido == "Submodulo") {
			objetoSeleccionado = await SubmoduloLibro.findOne({
				id: inputs.objetoId
			});
			curso = await sails.helpers
				.solicitarCursoCompleto(inputs.objetoId)
				.intercept(err => {
					sails.log("ERROR EN HELPERS: " + err);
				});
			let moduloPadre = await ModuloLibro.findOne({
				id: objetoSeleccionado.modulo
			});
			//la propiedad nombre sirve para identificar indistintamente si es modulo o submodulo
			objetoSeleccionado.nombre = objetoSeleccionado.nombreSubmodulo;
			objetoSeleccionado.color = moduloPadre.color;
			objetoSeleccionado.nombrePadre = moduloPadre.nombreModulo;
		} else {
			return res
				.status(500)
				.send({ problema: "no se encontró el tipo de contenido" });
		}

		if (!objetoSeleccionado) {
			//si no se ha encontrado un modulo o submodulo con el id entregado se devuelve un mensaje de error
			var err = new Error();
			err.name = "objetoNoEncontrado";
			err.message = "El objeto no se encuentra en la base de datos";
			return res.status(500).send({ error: err });
		}

		//PREPARACION LINKS DE NAVEGACION ADELANTE Y ATRAS
		var arreglo = [];
		if (curso.modulos.length != 0) {
			//agrego modulos y submodulos en un mismo arreglo
			curso.modulos.forEach(modulo => {
				arreglo.push({ objetoId: modulo.id, tipoContenido: "Modulo" });
				modulo.submodulos.forEach(submodulo => {
					arreglo.push({ objetoId: submodulo.id, tipoContenido: "Submodulo" });
				});
			});

			//selecciono los elementos antes y despues del elemento que contiene al objeto seleccionado
			if (arreglo.length == 1) {
				navegarAtras = "/administrar-indice/?cursoId=" + curso.id;
				navegarSiguiente = "/administrar-indice/?cursoId=" + curso.id;
			} else {
				for (let i = 0; i <= arreglo.length - 1; i++) {
					if (arreglo[i].objetoId == objetoSeleccionado.id) {
						//si el objeto es el primero o es el único
						if (i == 0) {
							// el anterior retorna al indice
							navegarAtras = "/administrar-indice/?cursoId=" + curso.id;
							navegarSiguiente =
								"/administrar-contenido/?objetoId=" +
								arreglo[i + 1].objetoId +
								"&tipoContenido=" +
								arreglo[i + 1].tipoContenido;
						} else if (i == arreglo.length - 1) {
							navegarAtras =
								"/administrar-contenido/?objetoId=" +
								arreglo[i - 1].objetoId +
								"&tipoContenido=" +
								arreglo[i - 1].tipoContenido;
							navegarSiguiente = "/administrar-indice/?cursoId=" + curso.id;
						} else {
							navegarAtras =
								"/administrar-contenido/?objetoId=" +
								arreglo[i - 1].objetoId +
								"&tipoContenido=" +
								arreglo[i - 1].tipoContenido;
							navegarSiguiente =
								"/administrar-contenido/?objetoId=" +
								arreglo[i + 1].objetoId +
								"&tipoContenido=" +
								arreglo[i + 1].tipoContenido;
						}
					}
				}
			}
		}

		return exits.success({
			curso,
			objetoSeleccionado,
			usuario,
			navegarAtras,
			navegarSiguiente
		});
	}
};
