module.exports = {


  friendlyName: 'View progreso estudiante',


  description: 'Display "Progreso estudiante" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/progreso-estudiante'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
