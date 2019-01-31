module.exports = {


  friendlyName: 'View indice estudiante',


  description: 'Display "Indice estudiante" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/indice-estudiante'
    }

  },


  fn: async function (inputs,exits) {

    // Respond with view.
    return exits.success();

  }


};
