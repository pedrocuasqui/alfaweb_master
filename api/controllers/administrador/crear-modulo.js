/*jshint esversion:8 */
module.exports = {
	friendlyName: "Crear modulo",

	description: "",

	inputs: {
		nombreModulo: {
			type: "string",
			required: true
		},
		descripcionModulo: {
			type: "string",
			required: true
		},
		rutaPortada: {
			type: "string",
			required: true
		},
		cursoId: {
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

	exits: {
		redirect: {
			description: "Redirecciona a otra página despues de crear el curso",
			responseType: "redirect" // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
			//ejemplos: responseType:'ok'  responseType:'view'
		}
		//solo se envian los codigos
		// badRequest:{
		//   description:'Error en el cliente'
		// },
		// serverError:{
		//   description:'Error en el servidor'
		// }
	},

	fn: async function(inputs) {
		var objetoError = {};
		var moduloCreado = {};
		var nuevoModulo = {};

		nuevoModulo = {
			nombreModulo: inputs.nombreModulo,
			descripcion: inputs.descripcionModulo,
			multimedia: { imagen: inputs.rutaPortada },
			curso: inputs.cursoId,
			contenidoTiny: inputs.contenidoTiny,
			submodulos: [],
			color: inputs.color
		};
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

		//crea el modulo
		moduloCreado = await sails.helpers.crearModulo(nuevoModulo).catch(err => {
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

		if (Object.keys(objetoError).length > 0) {
			// si existe un error responde con el codigo de error correspondiente y el mensaje de erro
			return res
				.status(objetoError.statusCode)
				.send({ error: objetoError.error });
		}

		return res.ok(moduloCreado);

		// return this.res.ok;
	}
};
