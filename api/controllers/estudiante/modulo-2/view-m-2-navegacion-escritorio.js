module.exports = {


  friendlyName: 'View m 2 navegacion escritorio',


  description: 'Display "M 2 navegacion escritorio" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-2/m-2-navegacion-escritorio'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
