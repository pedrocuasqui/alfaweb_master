module.exports = {


  friendlyName: 'View registro',


  description: 'Display "Registro" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/autenticacion/registro-usuario'
    }

  },


  fn: async function (inputs,exits) { // sin inputs en este controlador obtengo un resultado de error

    return exits.success({});

  }


};
