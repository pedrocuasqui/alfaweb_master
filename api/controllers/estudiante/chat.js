/*jshint esversion:8 */
module.exports = {
	friendlyName: "Crear intento evaluacion",

	description: "",

	inputs: {},

	exits: {
		success: {
			description: "retorna exito"
		}
	},

	fn: async function(inputs, exits) {
		sails.sockets.join(this.req, "estudiantesLogueados");
		sails.sockets.broadcast("estudiantesLogueados", {
			datosDifundidosChat: this.req.session.usuario
		});
		console.log("SOCKET CREADO Y USUARIO ADJUNTADO");
		return exits.success({});
	}
};
