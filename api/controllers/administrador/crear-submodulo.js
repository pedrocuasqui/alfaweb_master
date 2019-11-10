/*jshint esversion:8 */
module.exports = {
	friendlyName: "Crear submodulo",

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
		moduloId: {
			type: "string",
			required: true
		},
		contenidoTiny: {
			type: "string",
			required: false
		},
		color: {
			type: "string",
			required: false
		}
	},

	exits: {},

	fn: async function(inputs) {
		var res = this.res;
		var req = this.req;
		var respuestaCargaImagen = true; //se establece en true porque ya no se recibe la entrada 'multimedia' para esta accion
		var nuevoArchivo = {};
		// var statusCode = null;
		// var filaParaGuardarSubmodulo = crearSubmodulo(); //la funcion está en estado pendiente
		// var errores = false;
		var submoduloCreado = {};
		var objetoError = {};

		var nuevoSubmodulo = {
			//se resuelve esta promesa y se mantiene su resultado sin presentarlos aun en la funcion crearSubmodulo()
			nombreSubmodulo: inputs.nombreSubmodulo,
			descripcion: inputs.descripcionSubmodulo,
			multimedia: nuevoArchivo,
			modulo: inputs.moduloId,
			contenidoTiny: inputs.contenidoTiny,
			color: inputs.color
		};

		if (req.param("multimedia")) {
			// si exise el parametro 'multimedia' invoca a la funcion cargaImagen
			respuestaCargaImagen = cargaImagen();
		}

		if (respuestaCargaImagen) {
			// si no hubo problema en procesar la imagen entonces se crea el modulo
			submoduloCreado = await sails.helpers
				.crearSubmodulo(nuevoSubmodulo)
				.catch(err => {
					if (err.code == "E_UNIQUE") {
						objetoError.statusCode = 409;
						objetoError.error = err;
					} else if ((err.name = "UsageError")) {
						objetoError.statusCode = 400;
						objetoError.error = err;
					} else {
						objetoError.statusCode = 500;
						objetoError.error = err;
					}
				});
		} else {
			return res.status(500);
		}

		if (Object.keys(objetoError).length > 0) {
			// si existe un error responde con el codigo de error correspondiente y el mensaje de erro
			return res
				.status(objetoError.statusCode)
				.send({ error: objetoError.error });
		} else {
			return res.ok(submoduloCreado);
		}

		////////////////////////////////////////////////////////
		//////////////////FUNCION CARGA IMAGEN//////////////////
		////////////////////////////////////////////////////////

		function cargaImagen() {
			this.req.file("multimedia").upload(
				{
					//por defecto sails usa SKEEPER para recibir archivos y texto, se puede cambiar si es necesario ir a congif/http.js
					dirname: "../../assets/images/uploaded",
					// don't allow the total upload size to exceed ~20MB
					maxBytes: 1024 * 1024 * 20 //10MB
				},
				(err, uploadedFiles) => {
					sails.log("exito al recibir");
					//  `fd` (file descriptor)
					nuevoArchivo = uploadedFiles[0];
					// sails.log(uploadedFiles[0]);

					// If no files were uploaded, respond with an error.
					if (uploadedFiles.length != 0 && err) {
						return false; //Respuesta para axios ERROR EN EL SERVIDOR
					}

					return true;
				}
			);
		}
	} //fn async
};
