module.exports = {


  friendlyName: 'View m 1 conexion componentes teclado',


  description: 'Display "M 1 conexion componentes teclado" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-conexion-componentes-teclado'
    }

  },

  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }
};
