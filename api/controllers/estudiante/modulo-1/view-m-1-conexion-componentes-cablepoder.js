module.exports = {


  friendlyName: 'View m 1 conexion componentes cablepoder',


  description: 'Display "M 1 conexion componentes cablepoder" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-conexion-componentes-cablepoder'
    }

  },

  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
