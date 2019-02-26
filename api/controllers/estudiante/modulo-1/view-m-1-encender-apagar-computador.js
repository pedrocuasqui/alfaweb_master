module.exports = {


  friendlyName: 'View m 1 encender apagar computador',


  description: 'Display "M 1 encender apagar computador" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-encender-apagar-computador'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }
};
