module.exports = {


  friendlyName: 'View homepage',


  description: 'Display "homepage" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/homepage'
    }

  },


  fn: async function (inputs, exits) {

    // this.req.session.userId="123456789";
// Evaluar el tipo de usuario que está realizando la petición
    if (this.req.session.userId) {
      this.req.session.nombreUsuario = "Marco";//Buscar en la base de datos el nombre del usuario según el id 
      nombreUsuario = this.req.session.nombreUsuario;
      return exits.success({ nombreUsuario });
    } else
      return exits.success({ nombreUsuario:null });

  }


};
