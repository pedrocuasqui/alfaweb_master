/**
 * Curso.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
	tableName: "sessions",
	attributes: {
		session: {
			type: "json",
			columnName: "session"
		}
		//  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
		//  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
		//  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
	}
};