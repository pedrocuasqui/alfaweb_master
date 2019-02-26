module.exports = {


  friendlyName: 'View m 1 conexion componentes flashmemory',


  description: 'Display "M 1 conexion componentes flashmemory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/modulo-1/m-1-conexion-componentes-flashmemory'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
