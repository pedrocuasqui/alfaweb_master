module.exports = {


  friendlyName: 'View m 1 sistema informatico cpu',


  description: 'Display "M 1 sistema informatico cpu" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-sistema-informatico-cpu'
    }

  },


  fn: async function (inputs,exits) {

    // Respond with view.
    return exits.success();

  }


};
