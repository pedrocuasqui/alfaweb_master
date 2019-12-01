/*jshint esversion:8 */
module.exports = {
	friendlyName: "Registro usuario",

	description:
		"Registra los datos del usuario recibidos como parámetro en una base de datos",

	inputs: {
		nombre: {
			type: "string",
			required: true
		},
		alias: {
			type: "string",
			required: true
		},
		email: {
			type: "string"
		},
		password: {
			type: "string",
			required: true
		},
		rol: {
			type: "string",
			required: true
		}
	},

	exits: {
		success: {
			description: "exito"
		},
		// redirect: {
		//   description: 'Redirecciona a otra página despues de registrar al usuario',
		//   responseType: 'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
		//   //ejemplos: responseType:'ok'  responseType:'view'
		// },
		aliasoEmailYaEnUso: {
			statusCode: 409,
			description: "alias  o email ya en uso."
		}
	},

	fn: async function(inputs, exits) {
		var res = this.res;
		var passwordEncriptada = await sails.helpers.hashPassword(inputs.password);
		// All done.
		var usuarioCreado = null;
		var existeUsuario = null;
		// Busca en tablas profesor y estudiante el alias, el correo se puede repetir, menos el alias
		try {
			existeUsuario = await Estudiante.findOne({ alias: inputs.alias });
			if (existeUsuario) {
				return res.status(409).send();
			}

			existeUsuario = await Profesor.findOne({ alias: inputs.alias });
			if (existeUsuario) {
				return res.status(409).send();
			}
		} catch (err) {
			return res.status(500).send({ err });
		}

		//
		// a continuacion se crea el usuario una vez confirmado que no existe ya un alias creado
		//
		if (inputs.rol == "estudiante") {
			//registra al usuario en la tabla estudiante
			usuarioCreado = await Estudiante.create({
				nombre: inputs.nombre,
				alias: inputs.alias,
				email: inputs.email.toLowerCase(),
				password: passwordEncriptada
				// ultimoAcceso:Date.now(), //solo para crear
				// avance:{} //inicia vacio
			})
				.fetch()
				.intercept("E_UNIQUE", () => {
					var errores = new Error();
					errores.message =
						"Ya existe el usuario con el alias o email provistos";
					return res.status(409).send({ error: errores });
				})
				.intercept(err => {
					sails.log("ERROR GENERAL\n" + err);
				});

			sails.log("ESTUDIANTE CREADO CORRECTAMENTE");
		} else if (inputs.rol == "administrador") {
			//registra al usuario en la coleccion profesor
			usuarioCreado = await Profesor.create({
				nombre: inputs.nombre,
				alias: inputs.alias,
				email: inputs.email.toLowerCase(),
				password: passwordEncriptada,
				administrador: true,
				tutor: false
			})
				.fetch()

				.intercept("E_UNIQUE", () => {
					//LAS TRES sentencias siguientes son iguales,
					// la primera toma mas tiempo que la segunda y la tercera
					// return res.status(409).send();
					//  return exits.aliasoEmailYaEnUso()
					return "aliasoEmailYaEnUso";
				})
				.intercept(err => {
					sails.log("ERROR GENERAL\n" + err + "\n FIN ERROR GENERAL");
				});

			sails.log("ADMIN CREADO CORRECTAMENTE");
		}

		return res.status(200).send({ usuarioCreado }); // es necesario retornar algo para que axios sepa que realizar
	}
};
