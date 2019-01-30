module.exports = {


  friendlyName: 'Administrar contenidos',


  description: 'Desplega la página "administrar contenidos"',


  inputs: {

  },


  exits: {
     success:{
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/administrador/administrar-contenidos'
     }

  },


  fn: async function (inputs,exits) {
/*
    if (this.req.me) {
      throw {redirect:'/welcome'};
    }
*/
    return exits.success();

  }


};
