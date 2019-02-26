module.exports = {


  friendlyName: 'View m 1 sistema informatico impresora',


  description: 'Display "M 1 sistema informatico impresora" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-sistema-informatico-impresora'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
