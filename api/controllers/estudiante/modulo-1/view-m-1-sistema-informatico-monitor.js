module.exports = {


  friendlyName: 'View m 1 sistema informatico monitor',


  description: 'Display "M 1 sistema informatico monitor" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-sistema-informatico-monitor'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
