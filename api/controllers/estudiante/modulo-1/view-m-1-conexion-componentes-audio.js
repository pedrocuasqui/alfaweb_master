module.exports = {


  friendlyName: 'View m 1 conexion componentes audio',


  description: 'Display "M 1 conexion componentes audio" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-conexion-componentes-audio'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
