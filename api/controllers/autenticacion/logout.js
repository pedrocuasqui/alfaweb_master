/*jshint esversion:8 */
module.exports = {
	friendlyName: "Logout",

	description: "Log out of this app.",

	extendedDescription: `This action deletes the \`req.session.userId\` key from the session of the requesting user agent.
  Actual garbage collection of session data depends on this app's session store, and
  potentially also on the [TTL configuration](https://sailsjs.com/docs/reference/configuration/sails-config-session)
  you provided for it.
  
  Note that this action does not check to see whether or not the requesting user was
  actually logged in.  (If they weren't, then this action is just a no-op.)`,

	exits: {
		redirect: {
			description: "Retorna  a la página principal.",
			extendedDescription:
				"After logging out from a web browser, the user is redirected away.",
			responseType: "redirect"
		}
	},

	fn: async function(inputs, exits) {
		// Clear the `userId` property from this session.
		//la coleccion session debe estar ligada a un modelo de sails para poder usar waterline
		var datastoreSails = sails.getDatastore().manager;
		//buscar en intentoEvaluacion las evaluaciones en cada modulo que pertenecen al curso solicitado y que han sido aprobadas
		// let ObjectId = require("mongodb").ObjectID;
		// let estudianteObjectId = ObjectId(this.req.session.userId);
		console.log(
			`intento eliminar session id usuario:  .*${this.req.session.userId}.*`
		);
		var expresion = `.*${this.req.session.userId}.*`;
		// await datastoreSails.collection("sessions").findOneAndDelete({
		// 	session: { usuario: { id: this.req.session.userId } }
		// });
		// await Sessions.destroy({
		// 	session: { usuario: { id: this.req.session.userId } }
		// });

		var sesiones = await Sessions.find();
		console.log(`SESSIONES: ${JSON.stringify(sesiones)}`);
		delete this.req.session.userId;
		return exits.redirect("/");
	}
};
