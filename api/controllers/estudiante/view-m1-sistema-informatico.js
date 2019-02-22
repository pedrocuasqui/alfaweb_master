module.exports = {


  friendlyName: 'View m 1 sistema informatico',


  description: 'Display "M 1 sistema informatico" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/m1-sistema-informatico'
    }

  },


  fn: async function (inputs,exits) {

    // Respond with view.
    return exits.success();

  }


};
