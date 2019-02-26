module.exports = {


  friendlyName: 'View m 1 sistema informatico usb',


  description: 'Display "M 1 sistema informatico usb" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-sistema-informatico-usb'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }



};
