module.exports = {


  friendlyName: 'View m 1 conexion componentes monitor',


  description: 'Display "M 1 conexion componentes monitor" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-conexion-componentes-monitor'
    }

  },

  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }



};
