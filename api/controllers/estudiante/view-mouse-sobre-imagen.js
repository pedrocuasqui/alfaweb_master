module.exports = {


  friendlyName: 'View mouse sobre imagen',


  description: 'Display "Mouse sobre imagen" page.',

  inputs:{

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/estudiante/mouse-sobre-imagen'
    }

  },


  fn: async function (inputs,exits) {

    // Respond with view.
    return exits.success();

  }


};
