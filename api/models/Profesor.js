/**
 * Administrador.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
	tableName: "Profesor",
	attributes: {
		//  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
		//  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
		//  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
		nombre: {
			type: "string",
			columnName: "nombre",
			required: true
		},
		alias: {
			type: "string",
			columnName: "alias",
			required: true,
			unique: true
		},
		email: {
			type: "string",
			columnName: "email",
			required: true,
			unique: false
		},
		password: {
			type: "string",
			columnName: "password",
			required: true
		},
		administrador: {
			type: "boolean",
			columnName: "administrador",
			required: true
		},
		tutor: {
			type: "boolean",
			columnName: "tutor",
			required: true
		},
		confirmado: {
			type: "boolean",
			columnName: "confirmado",
			required: true,
			unique: false
		},

		//  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
		//  ║╣ ║║║╠╩╗║╣  ║║╚═╗
		//  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

		//  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
		//  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
		//  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
		cursos: {
			//Un Profesor crea varios cursos     profesor-->cursos
			collection: "Curso",
			via: "profesor"
		}
	}
};
