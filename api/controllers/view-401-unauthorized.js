module.exports = {


  friendlyName: 'View 401 unauthorized',


  description: 'Display "401 unauthorized" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/401-unauthorized'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
