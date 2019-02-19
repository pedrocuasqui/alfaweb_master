module.exports = {


  friendlyName: 'View m 1 evaluacion',


  description: 'Display "M 1 evaluacion" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/m1-evaluacion'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
