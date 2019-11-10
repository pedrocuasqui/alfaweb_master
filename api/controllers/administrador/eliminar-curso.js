/*jshint esversion:8 */
module.exports = {
	friendlyName: "Eliminar curso",

	description: "Elimina el curso enviado como parámetro",

	inputs: {
		cursoId: {
			type: "string",
			required: true
		}
	},

	exits: {
		redirect: {
			description: "Redirecciona a la página de home",
			responseType: "redirect" // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
			//ejemplos: responseType:'ok'  responseType:'view'
		}
	},

	fn: async function(inputs) {
		//si se pasa exits como parámetro deve ser usada

		try {
			await ModuloLibro.destroy({ curso: inputs.cursoId });
			await Curso.destroyOne({ id: inputs.cursoId });
			// sails.log('documento eliminado');
		} catch (e) {
			sails.log("Error al intentar eliminar el registro:\n" + e);
		}
		// All done.
		// return exits.redirect('/administrar-home');

		return "documento eliminado correctamente";
	}
};
