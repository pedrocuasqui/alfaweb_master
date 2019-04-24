module.exports = {


  friendlyName: 'View crear curso',


  description: 'Display "Crear curso" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/crear-curso'
    }

  },


  fn: async function (inputs,exits) {

    // Respond with view.
    return exits.success({});

  }


};
