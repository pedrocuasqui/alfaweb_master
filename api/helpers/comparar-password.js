/*jshint esversion:8 */
module.exports = {
	friendlyName: "compara password",

	description:
		"recibe un password en texto plano y un objeto usuario, compara ambos passwors y retorna true o false segun se encuentre o no coincidencia",

	inputs: {
		usuario: {
			type: "json",
			required: true
		},
		password: {
			type: "string",
			required: true
		}
	},

	exits: {},

	fn: async function(inputs) {
		const bcrypt = require("bcrypt");
		sails.log("ingresa a helper de comparacion de password ");
		const match = bcrypt.compareSync(inputs.password, inputs.usuario.password);
		sails.log("respuesta de match" + match);
		return match;
	}
};
