module.exports = {


  friendlyName: 'View m 1 evaluacion',


  description: 'Display "M 1 evaluacion" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-evaluacion'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
