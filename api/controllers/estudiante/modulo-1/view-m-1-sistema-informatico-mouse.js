module.exports = {


  friendlyName: 'View m 1 sistema informatico mouse',


  description: 'Display "M 1 sistema informatico mouse" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-sistema-informatico-mouse'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
