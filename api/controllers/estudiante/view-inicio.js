/*jshint esversion:8 */
module.exports = {
	friendlyName: "View inicio",

	description: 'Display "inicio" page.',
	inputs: {},

	exits: {
		success: {
			viewTemplatePath: "pages/estudiante/inicio"
		},
		redirect: {
			description:
				"Redirecciona a la página de administrador cuando se llama a inicio",
			responseType: "redirect" // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
			//ejemplos: responseType:'ok'  responseType:'view'
		}
	},

	fn: async function(inputs, exits) {
		var req = this.req;
		var res = this.res;
		// this.req.session.userId="123456789";
		// Evaluar el tipo de usuario que está realizando la petición
		// if (this.req.session.userId) {
		//   this.req.session.nombreUsuario = "pedro";//Buscar en la base de datos el nombre del usuario según el id
		//   nombreUsuario = this.req.session.nombreUsuario;
		//   return exits.success({ nombreUsuario });
		// } else
		//   return exits.success({ nombreUsuario: null });

		var usuario = null;
		var esAdmin = null;

		//si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

		if (req.session.userId) {
			// si existe un usuario
			// if (req.session.userId != 1) {// si el usuario no es visitante entonces se busca la información del usuario en la base de datos
			usuario = await Estudiante.findOne({ id: req.session.userId });

			if (!usuario) {
				usuario = await Profesor.findOne({ id: req.session.userId });
				esAdmin = true;
			}

			if (!usuario) {
				res
					.status(401)
					.send({ Error: "EL USUARIO NO SE ENCUENTRA EN LA BASE DE DATOS" });
				//respuesta pendiente de modificacion
			}
		} //SI NO EXISTE EL USUARIO SE REMITE NULL, DEL LADO DEL CLIENTE SE USA EL NOMBRE DE USUARIO VISITANTE, NADA MAS

		var cursosPublicados = await Curso.find({ where: { publicado: true } });

		if (esAdmin) {
			return exits.redirect("/administrar-home");
		} else {
			exits.success({ usuario, cursosPublicados });
		}
	}
};
