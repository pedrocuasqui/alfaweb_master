module.exports = {


  friendlyName: 'View m 1 conexion componentes mouse',


  description: 'Display "M 1 conexion componentes mouse" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-conexion-componentes-mouse'
    }

  },

  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }

};
