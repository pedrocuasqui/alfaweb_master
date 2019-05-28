module.exports = {


  friendlyName: 'View homepage',


  description: 'Display "homepage" page.',
  inputs: {
    usuarioId: {
      type: 'string'

    }
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/homepage'
    }

  },


  fn: async function (inputs, exits) {

    // this.req.session.userId="123456789";
    // Evaluar el tipo de usuario que está realizando la petición
    // if (this.req.session.userId) {
    //   this.req.session.nombreUsuario = "pedro";//Buscar en la base de datos el nombre del usuario según el id 
    //   nombreUsuario = this.req.session.nombreUsuario;
    //   return exits.success({ nombreUsuario });
    // } else
    //   return exits.success({ nombreUsuario: null });

    //valor quemado, en su lugar buscar por el id de sesion
    var usuario = await Estudiante.findOne({ alias: 'Pedroc' }).populate('cursos');
    // console.log(usuario);


    exits.success({ usuario });

  }


};
