module.exports = {


  friendlyName: 'View m 1 sistema informatico software',


  description: 'Display "M 1 sistema informatico software" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-sistema-informatico-software'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }

};
