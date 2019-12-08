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
		// Busca en tablas profesor y estudiante el alias y el correo, si existe algun alias o correo ya registrado, se retorna error
		try {
			existeUsuario = await Estudiante.findOne({ alias: inputs.alias });
			if (existeUsuario) {
				return res.status(409).send({ tipo: "alias" });
			}
			existeUsuario = await Estudiante.findOne({ email: inputs.email });
			if (existeUsuario) {
				return res.status(409).send({ tipo: "email" });
			}

			existeUsuario = await Profesor.findOne({ alias: inputs.alias });
			if (existeUsuario) {
				return res.status(409).send({ tipo: "alias" });
			}
			existeUsuario = await Profesor.findOne({ email: inputs.email });
			if (existeUsuario) {
				return res.status(409).send({ tipo: "email" });
			}
		} catch (err) {
			return res.status(500).send({ err });
		}

		/*SE DEFINE LA FUNCION QUE envia correo de confirmacion de cuenta con nodemailer */
		const nodemailer = require("nodemailer");
		// async..await is not allowed in global scope, must use a wrapper
		async function enviarCorreo(usuarioCreado) {
			// se crea el transporter con la cuenta de gmail
			let transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					// previo a general el password para especific- app es necesario configurar la autenticacion en dos pasos de gmail
					user: "pedro.cuasqui@gmail.com", // usuario
					pass: "mtggfotrvzxcfmfd" // password para una app especifica, esta configuracion se realiza en la cuenta de google
				}
			});

			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: "pedro.cuasqui@gmail.com", // sender address
				to: inputs.email.toLowerCase(), // list of receivers
				subject: 'Confirma tu cuenta "alfaweb" ✔', // Subject line
				text:
					'Has creado una cuenta en "alfaweb", abre este correo para confirmar', // plain text body
				html: `<div style="background-color:#27293d; color:#c0c1c2;"><h1>Bienvenido ${inputs.nombre},</h1><h2>Confirma tu cuenta para acceder a la plataforma</h2> <p>Da click en CONFIRMAR, se abrirá una ventana en tu navegador y podrás acceder a tu cuenta</p> </div> <a style="font-size:2em; background-color:white" href="${sails.config.custom.baseUrl}/confirmar-usuario/?usuarioId=${usuarioCreado.id}"> CONFIRMAR</a> ` // html body
			});

			console.log("Message sent: %s", info.messageId);
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
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
				password: passwordEncriptada,
				confirmado: false
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
			if (inputs.email && usuarioCreado) {
				// El correo ya no es opcional, es necesario para validar la creacion de cuentas del usuario, si el usuario ingresa sin correo deberia habilitarse por defecto el ingreso y si no registra correo tienen que ingresar con alias pero deber'ia por defecto tener permiso aun sin validar
				enviarCorreo(usuarioCreado).catch(console.error);
			}

			sails.log("ESTUDIANTE CREADO CORRECTAMENTE");
		} else if (inputs.rol == "administrador") {
			//registra al usuario en la coleccion profesor
			usuarioCreado = await Profesor.create({
				nombre: inputs.nombre,
				alias: inputs.alias,
				email: inputs.email.toLowerCase(),
				password: passwordEncriptada,
				administrador: true,
				tutor: false,
				confirmado: false
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
			if (inputs.email && usuarioCreado) {
				// El correo ya no es opcional, es necesario para validar la creacion de cuentas del usuario, si el usuario ingresa sin correo deberia habilitarse por defecto el ingreso y si no registra correo tienen que ingresar con alias pero deber'ia por defecto tener permiso aun sin validar
				enviarCorreo(usuarioCreado).catch(console.error);
			}
			sails.log("ADMIN CREADO CORRECTAMENTE");
		}

		return res.status(200).send({ usuarioCreado }); // es necesario retornar algo para que axios sepa que realizar
	}
};
